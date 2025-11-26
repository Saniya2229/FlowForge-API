import React, { useState } from "react";
import { FiEdit2, FiDownload, FiMapPin, FiMail, FiPhone, FiCalendar, FiLogOut, FiHome, FiChevronDown } from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";

export default function ProfileSummary({ user, onEdit }) {
    const navigate = useNavigate();
    const [showDropdown, setShowDropdown] = useState(false);

    if (!user) return null;

    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate("/");
    };

    return (
        <div className="max-w-5xl mx-auto p-6 space-y-8">
            {/* Header Card */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden relative">
                <div className="h-32 bg-gradient-to-r from-purple-600 to-indigo-600"></div>
                <div className="px-8 pb-8">
                    <div className="relative -mt-12 flex justify-between items-end">
                        <div className="flex items-end gap-6">
                            <div className="relative">
                                <button
                                    onClick={() => setShowDropdown(!showDropdown)}
                                    className="w-32 h-32 rounded-full border-4 border-white bg-white shadow-md overflow-hidden hover:opacity-90 transition"
                                >
                                    {user.profilePhoto ? (
                                        <img src={user.profilePhoto} alt="Profile" className="w-full h-full object-cover" />
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center bg-purple-100 text-purple-600 text-4xl font-bold">
                                            {user.firstName?.[0]}
                                        </div>
                                    )}
                                </button>

                                {/* Dropdown Menu */}
                                {showDropdown && (
                                    <div className="absolute top-full left-0 mt-2 bg-white rounded-lg shadow-xl border border-gray-200 py-2 z-50 min-w-[200px]">
                                        <button
                                            onClick={() => { navigate('/'); setShowDropdown(false); }}
                                            className="w-full px-4 py-2 text-left text-sm hover:bg-gray-50 flex items-center gap-2 text-gray-700"
                                        >
                                            <FiHome /> Home
                                        </button>
                                        <button
                                            onClick={handleLogout}
                                            className="w-full px-4 py-2 text-left text-sm hover:bg-red-50 flex items-center gap-2 text-red-600"
                                        >
                                            <FiLogOut /> Logout
                                        </button>
                                    </div>
                                )}
                            </div>
                            <div className="mb-2">
                                <h1 className="text-3xl font-bold text-gray-900">
                                    {user.firstName} {user.lastName}
                                </h1>
                                <p className="text-gray-500 font-medium flex items-center gap-2">
                                    {user.currentEducation_degree || "Student"}
                                    {user.currentEducation_college && <span>• {user.currentEducation_college}</span>}
                                </p>
                            </div>
                        </div>
                        <button
                            onClick={onEdit}
                            className="mb-4 flex items-center gap-2 px-4 py-2 bg-purple-50 text-purple-700 rounded-lg font-medium hover:bg-purple-100 transition"
                        >
                            <FiEdit2 /> Edit Profile
                        </button>
                    </div>

                    <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6 border-t border-gray-100 pt-6">
                        <div className="flex items-center gap-3 text-gray-600">
                            <div className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center text-gray-400">
                                <FiMail />
                            </div>
                            <div>
                                <div className="text-xs text-gray-400 uppercase font-semibold">Email</div>
                                <div className="text-sm font-medium">{user.email}</div>
                            </div>
                        </div>
                        <div className="flex items-center gap-3 text-gray-600">
                            <div className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center text-gray-400">
                                <FiPhone />
                            </div>
                            <div>
                                <div className="text-xs text-gray-400 uppercase font-semibold">Phone</div>
                                <div className="text-sm font-medium">{user.phone || "-"}</div>
                            </div>
                        </div>
                        <div className="flex items-center gap-3 text-gray-600">
                            <div className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center text-gray-400">
                                <FiMapPin />
                            </div>
                            <div>
                                <div className="text-xs text-gray-400 uppercase font-semibold">Location</div>
                                <div className="text-sm font-medium">{user.city}, {user.state}</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Details Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Left Column */}
                <div className="lg:col-span-2 space-y-8">

                    {/* Education */}
                    <Section title="Education">
                        <div className="space-y-6">
                            {user.currentEducation_degree && (
                                <TimelineItem
                                    title={user.currentEducation_degree}
                                    subtitle={user.currentEducation_college}
                                    date={`Year: ${user.currentEducation_year}`}
                                    desc={`CGPA: ${user.currentEducation_cgpa}`}
                                    current
                                />
                            )}
                            {user.previousEducation_12_school && (
                                <TimelineItem
                                    title="Class 12th / Diploma"
                                    subtitle={user.previousEducation_12_school}
                                    desc={`Marks: ${user.previousEducation_12_marks}%`}
                                />
                            )}
                            {user.previousEducation_10_school && (
                                <TimelineItem
                                    title="Class 10th"
                                    subtitle={user.previousEducation_10_school}
                                    desc={`Marks: ${user.previousEducation_10_marks}%`}
                                />
                            )}
                        </div>
                    </Section>

                    {/* Internships */}
                    <Section title="Experience">
                        {user.internships && user.internships.length > 0 ? (
                            <div className="space-y-6">
                                {user.internships.map((exp, i) => (
                                    <TimelineItem
                                        key={i}
                                        title={exp.role}
                                        subtitle={exp.company}
                                        date={exp.duration}
                                        desc={exp.description}
                                    />
                                ))}
                            </div>
                        ) : (
                            <p className="text-gray-400 italic">No experience added.</p>
                        )}
                    </Section>
                </div>

                {/* Right Column */}
                <div className="space-y-8">
                    {/* Documents */}
                    <Section title="Documents">
                        {user.documents && user.documents.length > 0 ? (
                            <ul className="space-y-3">
                                {user.documents.map((doc, i) => (
                                    <li key={i} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border border-gray-100">
                                        <span className="text-sm font-medium text-gray-700 truncate max-w-[150px]">{doc.name}</span>
                                        <a href={doc.url} target="_blank" rel="noreferrer" className="text-purple-600 hover:text-purple-800">
                                            <FiDownload />
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <p className="text-gray-400 italic text-sm">No documents uploaded.</p>
                        )}
                    </Section>

                    {/* Personal Info */}
                    <Section title="Personal Details">
                        <div className="space-y-4">
                            <DetailRow label="Gender" value={user.gender} />
                            <DetailRow label="Date of Birth" value={user.dob} />
                            <DetailRow label="Permanent Address" value={user.permanentAddress} />
                        </div>
                    </Section>
                </div>
            </div>
        </div>
    );
}

function Section({ title, children }) {
    return (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <h3 className="text-lg font-bold text-gray-800 mb-6 pb-2 border-b border-gray-50">{title}</h3>
            {children}
        </div>
    );
}

function TimelineItem({ title, subtitle, date, desc, current }) {
    return (
        <div className="relative pl-6 border-l-2 border-gray-100 last:border-0 pb-6 last:pb-0">
            <div className={`absolute -left-[9px] top-0 w-4 h-4 rounded-full border-2 border-white ${current ? 'bg-purple-600' : 'bg-gray-300'}`}></div>
            <div>
                <h4 className="font-bold text-gray-800 text-base">{title}</h4>
                <div className="text-purple-600 font-medium text-sm mb-1">{subtitle}</div>
                {date && <div className="text-xs text-gray-400 mb-2">{date}</div>}
                {desc && <p className="text-sm text-gray-600">{desc}</p>}
            </div>
        </div>
    );
}

function DetailRow({ label, value }) {
    return (
        <div>
            <div className="text-xs text-gray-400 uppercase font-semibold mb-1">{label}</div>
            <div className="text-sm font-medium text-gray-800">{value || "-"}</div>
        </div>
    );
}
