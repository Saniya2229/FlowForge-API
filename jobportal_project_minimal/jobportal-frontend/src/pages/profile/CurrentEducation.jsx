import React from "react";
import { updateProfile } from "../../api/user";

export default function CurrentEducation({
  value = {},
  onFieldChange,
  onNext,
  onPrev,
}) {
  const section = value || {};

  async function handleSaveNext(e) {
    e.preventDefault();
    try {
      await updateProfile({ currentEdu: section });
      onNext?.();
    } catch (err) {
      console.error("Failed to save current education", err);
      alert("Error saving current education");
    }
  }

  return (
    <form onSubmit={handleSaveNext}>
      <h2 className="text-2xl font-semibold mb-4">Current Education</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
        <select
          name="degree"
          value={section.degree || ""}
          onChange={onFieldChange}
          className="p-3 border rounded bg-white"
        >
          <option value="">Select Degree</option>
          <option value="B.Tech">B.Tech</option>
          <option value="B.E">B.E</option>
          <option value="BCA">BCA</option>
          <option value="MCA">MCA</option>
          <option value="B.Sc">B.Sc</option>
          <option value="M.Sc">M.Sc</option>
          <option value="B.Com">B.Com</option>
          <option value="M.Com">M.Com</option>
          <option value="BBA">BBA</option>
          <option value="MBA">MBA</option>
          <option value="Diploma">Diploma</option>
          <option value="Other">Other</option>
        </select>

        <input
          name="college"
          value={section.college || ""}
          onChange={onFieldChange}
          placeholder="College / University"
          className="p-3 border rounded"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
        <div>
          <input
            name="cgpa"
            value={section.cgpa || ""}
            onChange={(e) => {
              const val = e.target.value;
              // Allow only numbers and one decimal point, max 10.0
              if (val === "" || /^[0-9]*\.?[0-9]*$/.test(val)) {
                if (parseFloat(val) > 10) return; // simple max check
                onFieldChange(e);
              }
            }}
            placeholder="CGPA (Max 10.0)"
            className="p-3 border rounded w-full"
          />
          <p className="text-xs text-gray-500 mt-1">Scale of 10.0 (No %)</p>
        </div>

        <select
          name="year"
          value={section.year || ""}
          onChange={onFieldChange}
          className="p-3 border rounded bg-white"
        >
          <option value="">Select Passing Year</option>
          {Array.from({ length: 12 }, (_, i) => 2020 + i).map((y) => (
            <option key={y} value={y}>
              {y}
            </option>
          ))}
          {Array.from({ length: 10 }, (_, i) => 2019 - i).map((y) => (
            <option key={y} value={y}>
              {y}
            </option>
          ))}
        </select>
      </div>

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
          Save and Proceed
        </button>
      </div>
    </form>
  );
}
