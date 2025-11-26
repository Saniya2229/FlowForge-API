// src/pages/profile/Documents.jsx
import React, { useEffect, useState, useRef } from "react";
import { getProfile, updateProfile, uploadFile } from "../../api/user";

/**
 * Documents step:
 * - Shows uploaded documents
 * - Upload new document (single file)
 * - Remove document (client-side + persist)
 * - Calls updateProfile({ documents: [...] }) to persist list (flat)
 *
 * Props:
 *  - value (array)        // initial docs from draft
 *  - onChange (fn)        // notify parent draft
 *  - onNext, onPrev
 */
export default function Documents({ value = [], onChange, onNext, onPrev }) {
  const isInternalUpdate = useRef(false);
  const [docs, setDocs] = useState(Array.isArray(value) ? value : []);
  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);

  // sync with parent draft
  useEffect(() => {
    if (isInternalUpdate.current) {
      isInternalUpdate.current = false;
      return;
    }
    const newVal = Array.isArray(value) ? value : [];
    if (JSON.stringify(newVal) !== JSON.stringify(docs)) {
      setDocs(newVal);
    }
  }, [value]);

  // notify parent of changes (so autosave & progress update)
  useEffect(() => {
    const newVal = Array.isArray(value) ? value : [];
    if (JSON.stringify(newVal) !== JSON.stringify(docs)) {
      isInternalUpdate.current = true;
      onChange?.(docs);
    }
  }, [docs]);

  // handle file selection
  async function handleUpload(e) {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    try {
      // uploadFile should POST to /api/upload/profile-photo (multipart/form-data)
      const res = await uploadFile(file); // expects { url: "http://.../uploads/xxx" }
      const newDocs = [...docs, { url: res.url, name: file.name }];
      setDocs(newDocs);

      // persist immediately (optional)
      await updateProfile({ documents: newDocs });
    } catch (err) {
      console.error("Upload failed:", err);
      alert("Upload failed. See console.");
    } finally {
      setUploading(false);
      // clear file input value (optional)
      e.target.value = "";
    }
  }

  // remove doc
  async function handleRemove(idx) {
    const newDocs = docs.filter((_, i) => i !== idx);
    setDocs(newDocs);
    try {
      // persist change
      await updateProfile({ documents: newDocs });
    } catch (err) {
      console.error("Remove doc failed:", err);
      alert("Failed to remove document.");
    }
  }

  async function handleSaveNext(e) {
    e?.preventDefault();
    setSaving(true);
    try {
      await updateProfile({ documents: docs });
      if (onNext) onNext();
    } catch (err) {
      console.error("Save documents failed:", err);
      alert("Failed to save documents.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <form onSubmit={handleSaveNext}>
      <h2 className="text-2xl font-semibold mb-4">Profile Photo & Documents</h2>

      <div className="mb-4">
        <label className="block font-medium">
          Upload Documents / Certificates
        </label>
        <input
          type="file"
          accept=".pdf,.doc,.docx,.png,.jpg"
          onChange={handleUpload}
          className="mt-2"
        />
        <div className="text-sm text-gray-500 mt-1">
          Supported: PDF, DOCX, PNG, JPG. Max recommended size: 5MB.
        </div>
      </div>

      <div className="space-y-3">
        {docs.length === 0 && (
          <div className="text-sm text-gray-500">
            No documents uploaded yet.
          </div>
        )}

        {docs.map((d, i) => (
          <div
            key={i}
            className="flex items-center justify-between p-3 bg-white border rounded"
          >
            <a
              href={d.url}
              target="_blank"
              rel="noreferrer"
              className="text-blue-600 underline"
            >
              {d.name || `Document ${i + 1}`}
            </a>
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => window.open(d.url, "_blank")}
                className="text-sm px-3 py-1 border rounded"
              >
                View
              </button>
              <button
                type="button"
                onClick={() => handleRemove(i)}
                className="text-sm px-3 py-1 border rounded text-red-600"
              >
                Remove
              </button>
            </div>
          </div>
        ))}
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
          disabled={saving || uploading}
          className="px-6 py-2 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded"
        >
          {saving ? "Saving..." : "Save and Proceed"}
        </button>
      </div>
    </form>
  );
}
