// src/pages/SeekerDashboard.jsx
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getProfile } from "../api/user";
import { getMyResumes } from "../api/resume";
import { motion } from "framer-motion";
import {
  FiUser,
  FiBook,
  FiBriefcase,
  FiFileText,
  FiMapPin,
  FiEdit2,
  FiDownload,
  FiSettings,
  FiBell,
  FiHome,
} from "react-icons/fi";

export default function SeekerDashboard() {
  const [user, setUser] = useState(null);
  const [resume, setResume] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadDashboard() {
      try {
        const profile = await getProfile();
        setUser(profile);

        const resumes = await getMyResumes();
        if (resumes && resumes.length > 0) {
          setResume(resumes[0]); // Get the latest resume
        }
      } catch (err) {
        console.error("Dashboard load failed:", err);
      } finally {
        setLoading(false);
      }
    }
    loadDashboard();
  }, []);

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-600"></div>
      </div>
    );

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Left Sidebar - Superset Style */}
      <div className="w-64 bg-white border-r border-gray-200 flex-shrink-0 hidden lg:block h-screen sticky top-0 overflow-y-auto">
        <div className="p-6 text-center border-b border-gray-100">
          <div className="w-24 h-24 mx-auto bg-gray-200 rounded-full overflow-hidden mb-3 border-4 border-white shadow-sm">
            {user?.profilePhoto ? (
              <img
                src={user.profilePhoto}
                alt="Profile"
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-3xl text-gray-400 font-bold">
                {user?.firstName?.[0] || "U"}
              </div>
            )}
          </div>
          <h2 className="font-bold text-gray-900 text-lg">
            {user?.firstName} {user?.lastName}
          </h2>
          <div className="text-xs text-gray-500 mt-1">
            ID: {user?._id?.substring(0, 8).toUpperCase()}
          </div>
        </div>

        <div className="p-4">
          <div className="bg-purple-50 text-purple-700 text-xs p-3 rounded-lg mb-6 border border-purple-100">
            Your profile has been submitted for verification.
          </div>

          <nav className="space-y-1">
            <NavItem icon={<FiHome />} label="Home" />
            <NavItem icon={<FiUser />} label="My Profile" active />
            <NavItem icon={<FiFileText />} label="Resumes" />
            <NavItem icon={<FiBriefcase />} label="Internships" />
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Top Header */}
        <header className="bg-white border-b border-gray-200 h-16 flex items-center justify-between px-8 sticky top-0 z-10">
          <h1 className="text-xl font-bold text-gray-800">My Profile</h1>
          <div className="flex items-center gap-4 text-gray-500">
            <FiSettings className="hover:text-gray-800 cursor-pointer" />
            <FiBell className="hover:text-gray-800 cursor-pointer" />
            <div className="w-8 h-8 bg-purple-600 rounded-full text-white flex items-center justify-center font-bold text-sm">
              {user?.firstName?.[0]}
            </div>
          </div>
        </header>

        <div className="p-8 max-w-5xl mx-auto w-full space-y-8 pb-20">
          {/* Basic Details Section */}
          <Section title="Basic Details" link="/profile/steps">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-y-6 gap-x-12">
              <InfoItem label="Full Name" value={`${user?.firstName} ${user?.lastName}`} />
              <InfoItem label="Date of Birth" value={user?.dob || "-"} />
              <InfoItem label="Gender" value={user?.gender || "-"} />
              <InfoItem
                label="Current College"
                value={user?.currentEducation?.college || user?.currentEducation_college || "-"}
              />
            </div>
          </Section>

          {/* Address Section */}
          <Section title="Address" link="/profile/steps">
            <div className="space-y-4">
              <InfoItem
                label="Permanent Address"
                value={user?.basic?.permanentAddress || user?.permanentAddress || "-"}
                fullWidth
              />
              <InfoItem
                label="Current Address"
                value={user?.basic?.currentAddress || user?.currentAddress || "-"}
                fullWidth
              />
            </div>
          </Section>

          {/* Education Details */}
          <Section title="Education Details" link="/profile/steps">
            <div className="space-y-6">
              {/* Current */}
              {(user?.currentEducation?.degree || user?.currentEducation_degree) && (
                <div className="border-l-4 border-purple-500 pl-4">
                  <h4 className="font-semibold text-gray-900">
                    {user?.currentEducation?.degree || user?.currentEducation_degree}
                  </h4>
                  <div className="text-gray-600 text-sm">
                    {user?.currentEducation?.college || user?.currentEducation_college}
                  </div>
                  <div className="text-gray-500 text-xs mt-1">
                    Passing Year: {user?.currentEducation?.year || user?.currentEducation_year} | CGPA: {user?.currentEducation?.cgpa || user?.currentEducation_cgpa}
                  </div>
                </div>
              )}

              {/* Previous */}
              {(user?.previousEdu?.previousEducation_12_school || user?.previousEducation_12_school) && (
                <div className="border-l-4 border-gray-300 pl-4">
                  <h4 className="font-semibold text-gray-900">
                    {user?.previousEdu?.isDiploma || user?.isDiploma ? "Diploma" : "Class 12th"}
                  </h4>
                  <div className="text-gray-600 text-sm">
                    {user?.previousEdu?.previousEducation_12_school || user?.previousEducation_12_school}
                  </div>
                  <div className="text-gray-500 text-xs mt-1">
                    Marks: {user?.previousEdu?.previousEducation_12_marks || user?.previousEducation_12_marks}
                  </div>
                </div>
              )}
            </div>
          </Section>

          {/* Internships */}
          <Section title="Internship & Work Experience" link="/profile/steps">
            {user?.internships?.length > 0 ? (
              <div className="space-y-4">
                {user.internships.map((exp, idx) => (
                  <div key={idx} className="bg-gray-50 p-4 rounded-lg border border-gray-100">
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="font-bold text-gray-900">{exp.role}</h4>
                        <div className="text-gray-600 text-sm">{exp.company}</div>
                      </div>
                      <span className="text-xs bg-white px-2 py-1 rounded border text-gray-500">
                        {exp.duration}
                      </span>
                    </div>
                    {exp.description && (
                      <p className="text-gray-500 text-sm mt-2">{exp.description}</p>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-400 italic text-sm">No experience added yet.</p>
            )}
          </Section>

          {/* Resume */}
          <Section title="Resume" link="/resume/builder">
            {resume ? (
              <div className="flex items-center justify-between bg-purple-50 p-4 rounded-lg border border-purple-100">
                <div>
                  <h4 className="font-semibold text-purple-900">
                    {resume.name || "My Resume"}
                  </h4>
                  <div className="text-xs text-purple-600 mt-1">
                    Last updated: {new Date(resume.createdAt).toLocaleDateString()}
                  </div>
                </div>
                <a
                  href={resume.pdfUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-2 bg-purple-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-purple-700 transition"
                >
                  <FiDownload /> Download
                </a>
              </div>
            ) : (
              <div className="text-center py-4">
                <p className="text-gray-500 text-sm mb-2">No resume created.</p>
                <Link to="/resume/builder" className="text-purple-600 font-medium text-sm hover:underline">
                  Create Now
                </Link>
              </div>
            )}
          </Section>
        </div>
      </div>
    </div>
  );
}

/* Reusable Components */
function NavItem({ icon, label, active }) {
  return (
    <div
      className={`flex items-center gap-3 px-3 py-2 rounded-lg cursor-pointer transition ${active
          ? "bg-purple-50 text-purple-700 font-medium border-l-4 border-purple-600"
          : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
        }`}
    >
      <div className="text-lg">{icon}</div>
      <div className="text-sm">{label}</div>
    </div>
  );
}

function Section({ title, children, link }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden"
    >
      <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
        <h3 className="font-bold text-gray-800 text-lg">{title}</h3>
        {link && (
          <Link
            to={link}
            className="flex items-center gap-1 text-purple-600 text-sm font-medium hover:bg-purple-50 px-3 py-1 rounded-full transition"
          >
            <FiEdit2 size={14} /> Edit
          </Link>
        )}
      </div>
      <div className="p-6">{children}</div>
    </motion.div>
  );
}

function InfoItem({ label, value, fullWidth }) {
  return (
    <div className={fullWidth ? "w-full" : ""}>
      <div className="text-xs text-gray-400 uppercase tracking-wider font-semibold mb-1">
        {label}
      </div>
      <div className="text-gray-800 font-medium text-base break-words">
        {value}
      </div>
    </div>
  );
}
