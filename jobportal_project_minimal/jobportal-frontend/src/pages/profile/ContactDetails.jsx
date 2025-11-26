import React from "react";
import { updateProfile } from "../../api/user";

export default function ContactDetails({
  value = {},
  onFieldChange,
  onNext,
  onPrev,
}) {
  const section = value || {};

  async function handleSaveNext(e) {
    e.preventDefault();
    try {
      await updateProfile({ contact: section });
      onNext?.();
    } catch (err) {
      console.error(err);
      alert("Failed to save contact details.");
    }
  }

  return (
    <form onSubmit={handleSaveNext}>
      <h2 className="text-2xl font-semibold mb-4">Contact Details</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
        <input
          name="email"
          type="email"
          value={section.email || ""}
          onChange={onFieldChange}
          placeholder="Email address"
          className="p-3 border rounded"
        />

        <input
          name="alternatePhone"
          value={section.alternatePhone || ""}
          onChange={onFieldChange}
          placeholder="Alternate phone"
          className="p-3 border rounded"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
        <input
          name="city"
          value={section.city || ""}
          onChange={onFieldChange}
          placeholder="City"
          className="p-3 border rounded"
        />

        <input
          name="state"
          value={section.state || ""}
          onChange={onFieldChange}
          placeholder="State"
          className="p-3 border rounded"
        />
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
