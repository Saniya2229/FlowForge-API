import React from "react";
import { updateProfile } from "../../api/user";

export default function BasicDetails({
  value = {},
  onFieldChange,
  onNext,
  onPrev,
}) {
  const section = value || {};

  async function handleSaveAndNext(e) {
    e.preventDefault();

    try {
      // send section object to backend under 'basic'
      await updateProfile({ basic: section });
      onNext?.();
    } catch (err) {
      console.error(err);
      alert("Failed to save basic details");
    }
  }

  return (
    <form onSubmit={handleSaveAndNext}>
      <h2 className="text-2xl font-semibold mb-4">Basic Details</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <input
          name="firstName"
          value={section.firstName || ""}
          onChange={onFieldChange}
          placeholder="First name"
          className="p-3 border rounded"
        />
        <input
          name="middleName"
          value={section.middleName || ""}
          onChange={onFieldChange}
          placeholder="Middle name"
          className="p-3 border rounded"
        />
        <input
          name="lastName"
          value={section.lastName || ""}
          onChange={onFieldChange}
          placeholder="Last name"
          className="p-3 border rounded"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
        <input
          type="date"
          name="dob"
          value={section.dob || ""}
          onChange={onFieldChange}
          className="p-3 border rounded"
        />

        <select
          name="gender"
          value={section.gender || ""}
          onChange={onFieldChange}
          className="p-3 border rounded"
        >
          <option value="">Select gender</option>
          <option value="Female">Female</option>
          <option value="Male">Male</option>
          <option value="Other">Other</option>
        </select>

        <input
          name="phone"
          value={section.phone || ""}
          onChange={onFieldChange}
          placeholder="+91 98765 43210"
          className="p-3 border rounded"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Permanent Address
          </label>
          <textarea
            name="permanentAddress"
            value={section.permanentAddress || ""}
            onChange={onFieldChange}
            placeholder="Permanent address"
            className="p-3 border rounded h-24 w-full"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Current Address
          </label>
          <textarea
            name="currentAddress"
            value={section.currentAddress || ""}
            onChange={onFieldChange}
            placeholder="Current address"
            className="p-3 border rounded h-24 w-full"
          />

          <div className="mt-2 flex items-center gap-2">
            <input
              type="checkbox"
              name="sameAsPermanent"
              checked={!!section.sameAsPermanent}
              onChange={(e) => {
                // update sameAsPermanent
                onFieldChange(e);
                // if checked, copy permanentAddress into currentAddress
                if (e.target.checked) {
                  const synthetic = {
                    target: {
                      name: "currentAddress",
                      value: section.permanentAddress || "",
                    },
                  };
                  onFieldChange(synthetic);
                }
              }}
            />
            <label className="text-sm text-gray-600">
              Same as permanent address
            </label>
          </div>
        </div>
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
