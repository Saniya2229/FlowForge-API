// src/pages/jobs/JobsList.jsx
import React, { useEffect, useState } from "react";
import { listJobs } from "../../api/jobs";
import { Link } from "react-router-dom";

export default function JobsList() {
  const [loading, setLoading] = useState(true);
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    async function load() {
      try {
        const res = await listJobs();
        setJobs(res.data);
      } catch (err) {}
      setLoading(false);
    }
    load();
  }, []);

  if (loading) return <div>Loading...</div>;

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold">All Jobs</h2>

      <div className="mt-6 space-y-4">
        {jobs.map((job) => (
          <div key={job._id} className="border p-4 rounded bg-white shadow">
            <Link to={`/jobs/${job._id}`}>
              <h3 className="text-xl font-semibold">{job.title}</h3>
            </Link>
            <p className="text-gray-600">{job.location}</p>
            <p className="text-sm mt-1">{job.jobType}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
