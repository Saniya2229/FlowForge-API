// ✅ IMPORTS MUST ALWAYS BE AT TOP
import React, { useEffect, useState } from "react";
import { updateProfile } from "../../api/user";

// ===========================================
// Previous Education Component (Final Clean Version)
// ===========================================
export default function PreviousEducation({
  value = {},
  onChange, // Expects function(e) where e is { name, value }
  onNext,
  onPrev,
}) {
  // Local State
  const [form, setForm] = useState({
    previousEducation_10_school: "",
    previousEducation_10_marks: "",
    previousEducation_12_school: "",
    previousEducation_12_marks: "",
    isDiploma: false,
    ...value,
  });

  const [saving, setSaving] = useState(false);

  // Sync when parent updates
  useEffect(() => {
    setForm((p) => ({ ...p, ...value }));
  }, [value]);

  // Handle input changes
  function handleChange(e) {
    const { name, value, type, checked } = e.target;
    const val = type === "checkbox" || type === "radio" ? (name === "eduType" ? (value === "diploma") : checked) : value;

    // Special handling for radio
    if (name === "eduType") {
      const isDiploma = value === "diploma";
      setForm(p => ({ ...p, isDiploma }));
      onChange?.({ name: "isDiploma", value: isDiploma });
      return;
    }

    setForm((p) => ({ ...p, [name]: val }));

    // Sync with parent immediately
    onChange?.({ target: { name, value: val } });
  }

  // Save and go next
  async function handleSaveNext(e) {
    e.preventDefault();
    setSaving(true);

    try {
      // Just trigger next. The parent ProfileSteps handles autosave/persistence.
      onNext?.();
    } catch (err) {
      console.error(err);
    }

    setSaving(false);
  }

  return (
    <form onSubmit={handleSaveNext}>
      <h2 className="text-2xl font-semibold mb-4">Previous Education</h2>

      {/* 10th Details */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
        <input
          name="previousEducation_10_school"
          value={form.previousEducation_10_school || ""}
          onChange={handleChange}
          placeholder="10th School Name"
          className="p-3 border rounded"
        />

        <input
          name="previousEducation_10_marks"
          value={form.previousEducation_10_marks || ""}
          onChange={handleChange}
          placeholder="10th Marks / Percentage"
          className="p-3 border rounded"
        />
      </div>

      {/* 12th / Diploma Toggle */}
      <div className="mt-6 mb-2">
        <label className="font-semibold mr-4">Education Type:</label>
        <label className="inline-flex items-center gap-2 mr-4 cursor-pointer">
          <input
            type="radio"
            name="eduType"
            value="12th"
            checked={!form.isDiploma}
            onChange={handleChange}
          />
          12th Grade
        </label>
        <label className="inline-flex items-center gap-2 cursor-pointer">
          <input
            type="radio"
            name="eduType"
            value="diploma"
            checked={!!form.isDiploma}
            onChange={handleChange}
          />
          Diploma
        </label>
      </div>

      {/* 12th / Diploma Details */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <input
          name="previousEducation_12_school"
          value={form.previousEducation_12_school || ""}
          onChange={handleChange}
          placeholder={form.isDiploma ? "Diploma Institute Name" : "12th School / College"}
          className="p-3 border rounded"
        />

        <input
          name="previousEducation_12_marks"
          value={form.previousEducation_12_marks || ""}
          onChange={handleChange}
          placeholder={form.isDiploma ? "Diploma Percentage / CGPA" : "12th Marks / Percentage"}
          className="p-3 border rounded"
        />
      </div>

      {/* Actions */}
      <div className="mt-6 flex justify-end gap-3">
        {onPrev && (
          <button
            type="button"
            onClick={onPrev}
            className="px-4 py-2 border rounded"
          >
            Back
          </button>
        )}

        <button
          type="submit"
          className="px-6 py-2 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded"
        >
          {saving ? "Saving..." : "Save & Proceed"}
        </button>
      </div>
    </form>
  );
}
