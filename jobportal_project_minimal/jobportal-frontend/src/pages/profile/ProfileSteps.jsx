import React, { useEffect, useState, useRef, useCallback } from "react";
import Sidebar from "../../components/Sidebar";
import TopBanner from "../../components/TopBanner";
import BasicDetails from "./BasicDetails";
import ContactDetails from "./ContactDetails";
import CurrentEducation from "./CurrentEducation";
import PreviousEducation from "./PreviousEducation";
import Internships from "./Internships";
import Documents from "./Documents";
import ProfileSummary from "./ProfileSummary"; // Import Summary View
import { submitFullProfile, updateProfile, getProfile } from "../../api/user";

import {
  saveDraftToLocal,
  loadDraftFromLocal,
  computeCompletion,
} from "../../utils/profileDraft";

const steps = [
  { id: "basic", label: "Basic Details", comp: BasicDetails },
  { id: "contact", label: "Contact Details", comp: ContactDetails },
  { id: "currentEdu", label: "Current Education", comp: CurrentEducation },
  { id: "previousEdu", label: "Previous Education", comp: PreviousEducation },
  { id: "internships", label: "Internships & Work", comp: Internships },
  { id: "documents", label: "Documents", comp: Documents },
  { id: "finish", label: "Finish" },
];

export default function ProfileSteps() {
  const [active, setActive] = useState(0);
  const [draft, setDraft] = useState(null);
  const [user, setUser] = useState(null); // Store full user for Sidebar/Summary
  const [saved, setSaved] = useState(false);
  const [lastSavedAt, setLastSavedAt] = useState(null);
  const [showSummary, setShowSummary] = useState(false); // Toggle for summary view
  const saveTimer = useRef(null);

  /* ---------------- INITIAL LOAD ---------------- */
  useEffect(() => {
    async function init() {
      try {
        const backendData = await getProfile();
        setUser(backendData);

        // Check if profile is already completed
        if (backendData.profileCompleted) {
          setShowSummary(true);
        }

        // Construct draft from backend data (FLAT -> NESTED)
        let initialDraft = {
          basic: {
            firstName: backendData.firstName || backendData.basic?.firstName || "",
            middleName: backendData.middleName || backendData.basic?.middleName || "",
            lastName: backendData.lastName || backendData.basic?.lastName || "",
            dob: backendData.dob || backendData.basic?.dob || "",
            gender: backendData.gender || backendData.basic?.gender || "",
            phone: backendData.phone || backendData.basic?.phone || "",
            permanentAddress: backendData.permanentAddress || backendData.basic?.permanentAddress || "",
            currentAddress: backendData.currentAddress || backendData.basic?.currentAddress || "",
            sameAsPermanent: true,
          },
          contact: {
            email: backendData.email || backendData.contact?.email || "",
            alternatePhone: backendData.alternatePhone || backendData.contact?.alternatePhone || "",
            city: backendData.city || backendData.contact?.city || "",
            state: backendData.state || backendData.contact?.state || "",
          },
          currentEdu: {
            degree: backendData.currentEducation_degree || backendData.currentEdu?.degree || "",
            college: backendData.currentEducation_college || backendData.currentEdu?.college || "",
            cgpa: backendData.currentEducation_cgpa || backendData.currentEdu?.cgpa || "",
            year: backendData.currentEducation_year || backendData.currentEdu?.year || "",
          },
          previousEdu: {
            previousEducation_10_school: backendData.previousEducation_10_school || backendData.previousEdu?.school10 || "",
            previousEducation_10_marks: backendData.previousEducation_10_marks || backendData.previousEdu?.percent10 || "",
            previousEducation_12_school: backendData.previousEducation_12_school || backendData.previousEdu?.school12 || "",
            previousEducation_12_marks: backendData.previousEducation_12_marks || backendData.previousEdu?.percent12 || "",
            isDiploma: backendData.isDiploma || false,
          },
          internships: backendData.internships || [],
          documents: { list: backendData.documents || [] },
        };

        setDraft(initialDraft);
      } catch (err) {
        console.warn("Failed to fetch profile from backend", err);
        // Fallback to local if backend fails (rare)
        const saved = loadDraftFromLocal();
        if (saved) setDraft(saved);
        else {
          // Default empty draft
          setDraft({
            basic: {}, contact: {}, currentEdu: {}, previousEdu: {}, internships: [], documents: { list: [] }
          });
        }
      }
    }

    init();
  }, []);

  /* ---------------- FLATTEN HELPER ---------------- */
  function flattenDraft(d) {
    if (!d) return {};
    return {
      // Basic
      firstName: d.basic?.firstName,
      middleName: d.basic?.middleName,
      lastName: d.basic?.lastName,
      dob: d.basic?.dob,
      gender: d.basic?.gender,
      phone: d.basic?.phone,
      permanentAddress: d.basic?.permanentAddress,
      currentAddress: d.basic?.currentAddress,

      // Contact
      email: d.contact?.email,
      alternatePhone: d.contact?.alternatePhone,
      city: d.contact?.city,
      state: d.contact?.state,

      // Current Edu
      currentEducation_degree: d.currentEdu?.degree,
      currentEducation_college: d.currentEdu?.college,
      currentEducation_cgpa: d.currentEdu?.cgpa,
      currentEducation_year: d.currentEdu?.year,

      // Previous Edu
      previousEducation_10_school: d.previousEdu?.previousEducation_10_school,
      previousEducation_10_marks: d.previousEdu?.previousEducation_10_marks,
      previousEducation_12_school: d.previousEdu?.previousEducation_12_school,
      previousEducation_12_marks: d.previousEdu?.previousEducation_12_marks,
      isDiploma: d.previousEdu?.isDiploma,

      // Arrays
      internships: d.internships,
      documents: d.documents?.list || [],
    };
  }

  /* ---------------- CHANGE HANDLER ---------------- */
  const handleChange = useCallback((section) => {
    return (e) => {
      let name, value;
      if (e && e.target) {
        const { type, checked } = e.target;
        name = e.target.name;
        value = type === "checkbox" ? checked : e.target.value;
      } else {
        name = e.name;
        value = e.value;
      }

      setDraft((prev) => {
        if (!prev) return prev;
        return {
          ...prev,
          [section]: {
            ...prev[section],
            [name]: value,
          },
        };
      });
    };
  }, []);

  /* ---------------- AUTOSAVE ---------------- */
  useEffect(() => {
    if (!draft) return;

    if (saveTimer.current) clearTimeout(saveTimer.current);

    saveTimer.current = setTimeout(async () => {
      saveDraftToLocal(draft);

      try {
        const payload = flattenDraft(draft);
        await updateProfile(payload);
        setSaved(true);
        setLastSavedAt(new Date());

        // Update local user state for sidebar reflection
        setUser(prev => ({ ...prev, ...payload }));

        setTimeout(() => setSaved(false), 2000);
      } catch (err) {
        console.warn("Autosave failed", err);
      }
    }, 1500);

    return () => clearTimeout(saveTimer.current);
  }, [draft]);

  if (!draft) return <div className="p-6">Loading...</div>;

  /* ---------------- PROGRESS & TICKS ---------------- */
  const progress = computeCompletion(draft);

  function isStepComplete(stepId) {
    if (!draft) return false;
    switch (stepId) {
      case "basic": return !!draft.basic?.firstName && !!draft.basic?.phone;
      case "contact": return !!draft.contact?.email && !!draft.contact?.city;
      case "currentEdu": return !!draft.currentEdu?.degree && !!draft.currentEdu?.college;
      case "previousEdu":
        return !!draft.previousEdu?.previousEducation_12_school || !!draft.previousEdu?.previousEducation_10_school;
      case "internships": return Array.isArray(draft.internships) && draft.internships.length > 0;
      case "documents": return Array.isArray(draft.documents?.list) && draft.documents.list.length > 0;
      default: return false;
    }
  }

  /* ---------------- NAV ---------------- */
  function goNext() { setActive((s) => Math.min(s + 1, steps.length - 1)); }
  function goPrev() { setActive((s) => Math.max(s - 1, 0)); }

  /* ---------------- SUBMIT ---------------- */
  async function handleFinish() {
    if (!draft.basic?.firstName || !draft.contact?.email) {
      alert("Please fill in at least Basic Details and Contact Info.");
      return;
    }
    try {
      const payload = flattenDraft(draft);
      console.log("=== SUBMIT PAYLOAD ===", payload);
      console.log("=== DRAFT STATE ===", draft);

      await submitFullProfile(payload);
      alert("Profile Submitted Successfully!");
      // Instead of redirecting, just show summary
      const updatedUser = await getProfile();
      setUser(updatedUser);
      setShowSummary(true);
    } catch (err) {
      console.error("=== SUBMIT ERROR ===", err);
      console.error("Error details:", err.response?.data || err.message);
      alert("Failed to submit profile. Check console for details.");
    }
  }

  /* ---------------- RENDER ---------------- */
  // 1. SUMMARY VIEW
  if (showSummary) {
    return (
      <div className="min-h-screen bg-gray-50 flex">
        <Sidebar user={user} completion={100} />
        <div className="flex-1">
          <TopBanner height="h-28" />
          <div className="relative -mt-10">
            <ProfileSummary user={user} onEdit={() => setShowSummary(false)} />
          </div>
        </div>
      </div>
    );
  }

  // 2. WIZARD VIEW
  return (
    <div className="min-h-screen bg-gray-50 flex">
      <Sidebar user={user} completion={progress} />

      <div className="flex-1">
        <div className="max-w-7xl mx-auto p-6">
          <TopBanner height="h-28" />

          <div className="mt-6 grid grid-cols-12 gap-6">
            {/* Left Stepper */}
            <div className="col-span-12 lg:col-span-3">
              <div className="bg-white p-4 rounded-lg shadow sticky top-28">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="font-semibold">Profile Progress</h4>
                  <div className="text-sm text-gray-500">{progress}%</div>
                </div>

                <div className="w-full bg-gray-100 rounded-full h-2 mb-4">
                  <div
                    className="h-2 bg-gradient-to-r from-purple-600 to-indigo-500 transition-all"
                    style={{ width: `${progress}%` }}
                  ></div>
                </div>

                <ol className="space-y-3">
                  {steps.map((s, idx) => {
                    const isCompleted = isStepComplete(s.id);
                    const isActive = active === idx;

                    return (
                      <li key={s.id}>
                        <button
                          onClick={() => setActive(idx)}
                          className={`w-full text-left px-3 py-2 rounded flex items-center gap-3 ${isActive
                            ? "bg-purple-50 text-purple-700 font-semibold"
                            : "text-gray-700 hover:bg-gray-50"
                            }`}
                        >
                          <div
                            className={`w-7 h-7 rounded-full flex items-center justify-center ${isCompleted || isActive
                              ? "bg-purple-600 text-white"
                              : "bg-gray-100 text-gray-500"
                              }`}
                          >
                            {isCompleted ? "✓" : idx + 1}
                          </div>

                          <div>
                            <div className="text-sm">{s.label}</div>
                            <div className="text-xs text-gray-400">
                              {isActive
                                ? "Currently editing"
                                : isCompleted ? "Completed" : "Pending"}
                            </div>
                          </div>
                        </button>
                      </li>
                    )
                  })}
                </ol>

                <div className="mt-4 text-xs text-gray-500">
                  Autosave:{" "}
                  <span className={`font-medium transition-colors ${saved ? "text-green-600" : "text-gray-400"}`}>
                    {saved ? "Saved to Cloud" : "Saving..."}
                  </span>
                </div>
              </div>
            </div>

            {/* Right Form Panel */}
            <div className="col-span-12 lg:col-span-9">
              <div className="bg-white p-6 rounded-lg shadow min-h-[420px]">
                {active === 0 && (
                  <BasicDetails
                    value={draft.basic}
                    onFieldChange={handleChange("basic")}
                    onNext={goNext}
                  />
                )}

                {active === 1 && (
                  <ContactDetails
                    value={draft.contact}
                    onFieldChange={handleChange("contact")}
                    onNext={goNext}
                    onPrev={goPrev}
                  />
                )}

                {active === 2 && (
                  <CurrentEducation
                    value={draft.currentEdu}
                    onFieldChange={handleChange("currentEdu")}
                    onNext={goNext}
                    onPrev={goPrev}
                  />
                )}

                {active === 3 && (
                  <PreviousEducation
                    value={draft.previousEdu}
                    onChange={handleChange("previousEdu")}
                    onNext={goNext}
                    onPrev={goPrev}
                  />
                )}

                {active === 4 && (
                  <Internships
                    value={draft.internships}
                    onChange={(list) =>
                      setDraft((p) => ({ ...p, internships: list }))
                    }
                    onNext={goNext}
                    onPrev={goPrev}
                  />
                )}

                {active === 5 && (
                  <Documents
                    value={draft.documents?.list || []}
                    onChange={(list) =>
                      setDraft((p) => ({ ...p, documents: { list } }))
                    }
                    onNext={goNext}
                    onPrev={goPrev}
                  />
                )}

                {active === 6 && (
                  <div>
                    <h2 className="text-2xl font-semibold mb-4">Finish</h2>
                    <p>Review your profile and submit when ready.</p>

                    <div className="mt-6 flex justify-end gap-3">
                      <button
                        onClick={goPrev}
                        className="px-4 py-2 border rounded"
                      >
                        Back
                      </button>

                      <button
                        onClick={handleFinish}
                        className="px-4 py-2 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded"
                      >
                        Submit Profile
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
