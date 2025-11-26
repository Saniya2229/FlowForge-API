import React, { useEffect, useState, useRef } from "react";
import { updateProfile } from "../../api/user";

export default function Internships({ value = [], onChange, onNext, onPrev }) {
  // Use a ref to track if the update is coming from internal typing
  const isInternalUpdate = useRef(false);
  const [list, setList] = useState(value || []);
  const [saving, setSaving] = useState(false);

  // Sync from props ONLY if it's not an internal update cycle
  // and if the value is actually different (simple JSON stringify check for now)
  useEffect(() => {
    if (isInternalUpdate.current) {
      isInternalUpdate.current = false;
      return;
    }
    if (JSON.stringify(value) !== JSON.stringify(list)) {
      setList(value || []);
    }
  }, [value]);

  // Notify parent whenever internships change
  useEffect(() => {
    // We don't want to trigger parent update on mount if nothing changed
    // But we do want to trigger it when list changes
    if (JSON.stringify(value) !== JSON.stringify(list)) {
      isInternalUpdate.current = true;
      if (typeof onChange === "function") onChange(list);
    }
  }, [list]);

  // Add new internship block
  function addInternship() {
    const newItem = {
      company: "",
      role: "",
      duration: "",
      description: "",
    };
    setList((p) => [...p, newItem]);
  }

  // Remove internship
  function removeInternship(idx) {
    setList((p) => p.filter((_, i) => i !== idx));
  }

  // Update any field
  function updateField(idx, field, val) {
    setList((prev) =>
      prev.map((item, i) => (i === idx ? { ...item, [field]: val } : item))
    );
  }

  async function handleSave(e) {
    e.preventDefault();
    setSaving(true);

    try {
      // Send entire internships list to backend
      await updateProfile({ internships: list });
      if (onNext) onNext();
    } catch (err) {
      console.error("Save Internships failed:", err);
      alert("Failed to save Internships.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <form onSubmit={handleSave}>
      <h2 className="text-2xl font-semibold mb-4">
        Internships & Work Experience
      </h2>

      {list.map((item, idx) => (
        <div
          key={idx}
          className="border p-4 rounded-lg mb-4 bg-white shadow-sm"
        >
          <div className="flex justify-between items-center mb-3">
            <h4 className="font-semibold">Internship #{idx + 1}</h4>
            <button
              type="button"
              onClick={() => removeInternship(idx)}
              className="text-red-500 text-sm"
            >
              Remove
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              value={item.company}
              onChange={(e) => updateField(idx, "company", e.target.value)}
              placeholder="Company Name"
              className="p-3 border rounded"
            />

            <input
              value={item.role}
              onChange={(e) => updateField(idx, "role", e.target.value)}
              placeholder="Role / Position"
              className="p-3 border rounded"
            />

            <input
              value={item.duration}
              onChange={(e) => updateField(idx, "duration", e.target.value)}
              placeholder="Duration (e.g., 3 months)"
              className="p-3 border rounded"
            />

            <textarea
              value={item.description}
              onChange={(e) => updateField(idx, "description", e.target.value)}
              className="p-3 border rounded h-24 md:col-span-2"
              placeholder="Work / Responsibilities Summary"
            ></textarea>
          </div>
        </div>
      ))}

      <button
        type="button"
        onClick={addInternship}
        className="px-4 py-2 border rounded mb-4"
      >
        + Add Internship
      </button>

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
          disabled={saving}
          className="px-6 py-2 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded"
        >
          {saving ? "Saving..." : "Save & Proceed"}
        </button>
      </div>
    </form>
  );
}
