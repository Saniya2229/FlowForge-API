import React, { useState, useEffect } from "react";
import Sidebar from "../../components/Sidebar";
import { FiSearch, FiMapPin, FiBriefcase, FiDollarSign } from "react-icons/fi";
import { getProfile } from "../../api/user";

export default function JobSearch() {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [jobs, setJobs] = useState([
        {
            id: 1,
            title: "Frontend Developer",
            company: "TechCorp",
            location: "Bangalore",
            type: "Full-time",
            salary: "₹12-18 LPA",
            posted: "2 days ago",
        },
        {
            id: 2,
            title: "UI/UX Designer",
            company: "DesignStudio",
            location: "Pune",
            type: "Remote",
            salary: "₹8-12 LPA",
            posted: "1 day ago",
        },
        {
            id: 3,
            title: "React Native Developer",
            company: "AppWorks",
            location: "Mumbai",
            type: "Contract",
            salary: "₹15-25 LPA",
            posted: "5 days ago",
        },
    ]);

    useEffect(() => {
        async function loadUser() {
            try {
                const data = await getProfile();
                setUser(data);
            } catch (err) {
                console.error("Failed to load user", err);
            } finally {
                setLoading(false);
            }
        }
        loadUser();
    }, []);

    if (loading) {
        return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
    }

    return (
        <div className="min-h-screen bg-gray-50 flex">
            <Sidebar user={user} />
            <div className="flex-1 p-8">
                <header className="flex justify-between items-center mb-8">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-800">Find Your Dream Job</h1>
                        <p className="text-gray-500">Browse thousands of job openings</p>
                    </div>
                    <div className="w-10 h-10 bg-purple-600 rounded-full flex items-center justify-center text-white font-bold overflow-hidden">
                        {user?.profilePhoto ? (
                            <img src={user.profilePhoto} alt="Profile" className="w-full h-full object-cover" />
                        ) : (
                            <span>{user?.firstName?.[0] || "U"}</span>
                        )}
                    </div>
                </header>

                {/* Search Bar */}
                <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 mb-8 flex gap-4">
                    <div className="flex-1 flex items-center gap-3 px-4 bg-gray-50 rounded-lg">
                        <FiSearch className="text-gray-400" />
                        <input type="text" placeholder="Job title, skills, or company" className="bg-transparent w-full py-3 outline-none text-gray-700" />
                    </div>
                    <div className="flex-1 flex items-center gap-3 px-4 bg-gray-50 rounded-lg">
                        <FiMapPin className="text-gray-400" />
                        <input type="text" placeholder="Location" className="bg-transparent w-full py-3 outline-none text-gray-700" />
                    </div>
                    <button className="bg-purple-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-purple-700 transition">
                        Search
                    </button>
                </div>

                {/* Job List */}
                <div className="space-y-4">
                    {jobs.map(job => (
                        <div key={job.id} className="bg-white p-6 rounded-xl border border-gray-100 hover:shadow-md transition cursor-pointer group">
                            <div className="flex justify-between items-start">
                                <div>
                                    <h3 className="text-lg font-bold text-gray-800 group-hover:text-purple-600 transition">{job.title}</h3>
                                    <div className="text-gray-500 font-medium">{job.company}</div>
                                </div>
                                <span className="bg-purple-50 text-purple-700 px-3 py-1 rounded-full text-xs font-medium">
                                    {job.type}
                                </span>
                            </div>
                            <div className="mt-4 flex items-center gap-6 text-sm text-gray-500">
                                <div className="flex items-center gap-2">
                                    <FiMapPin /> {job.location}
                                </div>
                                <div className="flex items-center gap-2">
                                    <FiDollarSign /> {job.salary}
                                </div>
                                <div className="flex items-center gap-2">
                                    <FiBriefcase /> {job.posted}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
