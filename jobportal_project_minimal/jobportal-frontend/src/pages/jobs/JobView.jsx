// src/pages/jobs/JobView.jsx
import React, { useEffect, useState } from "react";
import { getJob } from "../../api/jobs";
import { useParams } from "react-router-dom";

export default function JobView() {
  const { id } = useParams();

  const [loading, setLoading] = useState(true);
  const [job, setJob] = useState(null);

  useEffect(() => {
    async function load() {
      try {
        const res = await getJob(id);
        setJob(res.data);
      } catch (err) {
        console.error(err);
      }
      setLoading(false);
    }
    load();
  }, [id]);

  if (loading) return <div>Loading...</div>;

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold">{job.title}</h2>

      <p className="mt-2 text-gray-600">{job.description}</p>

      <div className="mt-4 text-sm">
        <p>
          <strong>Location:</strong> {job.location}
        </p>
        <p>
          <strong>Salary:</strong> {job.salaryRange}
        </p>
        <p>
          <strong>Job Type:</strong> {job.jobType}
        </p>
      </div>
    </div>
  );
}
