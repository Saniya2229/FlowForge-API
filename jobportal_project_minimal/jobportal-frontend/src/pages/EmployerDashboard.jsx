// src/pages/EmployerDashboard.jsx
import React, { useEffect, useState } from "react";
import { getEmployerProfile, getMyJobs } from "../api/employer";
import { Link } from "react-router-dom";
import {
  FiBriefcase,
  FiUsers,
  FiTrendingUp,
  FiPlus,
  FiClock,
  FiMoreVertical,
  FiSearch
} from "react-icons/fi";

export default function EmployerDashboard() {
  const [profile, setProfile] = useState(null);
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const [p, j] = await Promise.all([
          getEmployerProfile(),
          getMyJobs()
        ]);
        setProfile(p);
        setJobs(j || []);
      } catch (err) {
        console.error("Employer dashboard error:", err);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-600"></div>
    </div>
  );

  // Calculate stats
  const totalJobs = jobs.length;
  const totalApplicants = jobs.reduce((acc, job) => acc + (job.applicantsCount || 0), 0);
  const activeJobs = jobs.length; // Assuming all are active for now

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-500 mt-1">Welcome back, {profile?.companyName || profile?.name}</p>
        </div>
        <Link
          to="/jobs/create"
          className="flex items-center gap-2 px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-xl font-semibold shadow-lg shadow-purple-200 transition-all transform hover:-translate-y-0.5"
        >
          <FiPlus className="text-xl" /> Post New Job
        </Link>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard
          icon={<FiBriefcase />}
          label="Total Jobs"
          value={totalJobs}
          color="bg-blue-50 text-blue-600"
        />
        <StatCard
          icon={<FiUsers />}
          label="Total Applicants"
          value={totalApplicants}
          color="bg-purple-50 text-purple-600"
        />
        <StatCard
          icon={<FiTrendingUp />}
          label="Active Jobs"
          value={activeJobs}
          color="bg-green-50 text-green-600"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Recent Jobs Table */}
        <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="p-6 border-b border-gray-50 flex justify-between items-center">
            <h2 className="text-lg font-bold text-gray-800">Recent Job Postings</h2>
            <Link to="/jobs" className="text-sm text-purple-600 font-medium hover:text-purple-700">View All</Link>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50/50">
                <tr className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  <th className="px-6 py-4">Job Title</th>
                  <th className="px-6 py-4">Posted Date</th>
                  <th className="px-6 py-4 text-center">Applicants</th>
                  <th className="px-6 py-4 text-center">Status</th>
                  <th className="px-6 py-4"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {jobs.slice(0, 5).map((job) => (
                  <tr key={job._id} className="hover:bg-gray-50/50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="font-semibold text-gray-900">{job.title}</div>
                      <div className="text-xs text-gray-500">{job.location}</div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      <div className="flex items-center gap-2">
                        <FiClock className="text-gray-400" />
                        {new Date(job.createdAt).toLocaleDateString()}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                        {job.applicantsCount || 0}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                        Active
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button className="text-gray-400 hover:text-gray-600 p-1 rounded-full hover:bg-gray-100">
                        <FiMoreVertical />
                      </button>
                    </td>
                  </tr>
                ))}
                {jobs.length === 0 && (
                  <tr>
                    <td colspan="5" className="px-6 py-12 text-center text-gray-500">
                      No jobs posted yet. Click "Post New Job" to get started!
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Company Profile Summary */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 h-fit">
          <h2 className="text-lg font-bold text-gray-800 mb-6">Company Profile</h2>

          <div className="flex items-center gap-4 mb-6">
            <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-purple-100 to-indigo-100 flex items-center justify-center text-2xl font-bold text-purple-600">
              {profile?.companyName?.[0] || "C"}
            </div>
            <div>
              <div className="font-bold text-gray-900 text-lg">{profile?.companyName || "Company Name"}</div>
              <div className="text-sm text-gray-500">{profile?.email}</div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="p-4 bg-gray-50 rounded-xl">
              <div className="text-xs text-gray-500 uppercase font-semibold mb-1">Phone</div>
              <div className="font-medium text-gray-900">{profile?.phone || "Not added"}</div>
            </div>
            <div className="p-4 bg-gray-50 rounded-xl">
              <div className="text-xs text-gray-500 uppercase font-semibold mb-1">Location</div>
              <div className="font-medium text-gray-900">{profile?.address || "Not added"}</div>
            </div>
          </div>

          <Link
            to="/profile/employer"
            className="mt-6 w-full block text-center py-2.5 px-4 border border-gray-200 rounded-lg text-sm font-semibold text-gray-600 hover:bg-gray-50 transition-colors"
          >
            Edit Profile
          </Link>
        </div>
      </div>
    </div>
  );
}

function StatCard({ icon, label, value, color }) {
  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4 hover:shadow-md transition-shadow">
      <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-2xl ${color}`}>
        {icon}
      </div>
      <div>
        <div className="text-gray-500 text-sm font-medium">{label}</div>
        <div className="text-2xl font-bold text-gray-900">{value}</div>
      </div>
    </div>
  );
}
