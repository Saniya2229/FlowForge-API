// src/components/Sidebar.jsx
import React, { useState } from "react";
import logo from "../assets/logo.png";
import { NavLink, useNavigate } from "react-router-dom";
import {
  FiHome,
  FiUser,
  FiBriefcase,
  FiClipboard,
  FiBell,
  FiLayers,
  FiFileText,
  FiHelpCircle,
  FiLogOut,
  FiChevronDown,
} from "react-icons/fi";
import { computeCompletion } from "../utils/profileDraft";

/**
 * Premium Sidebar (Option C)
 * - dark/soft background, rounded cards, icons, hover + active states
 * - uses uploaded file as small logo (change path if you move the file)
 */

const seekerItems = [
  { to: "/dashboard/seeker", label: "Home", icon: <FiHome /> },
  { to: "/find-jobs", label: "Job Profiles", icon: <FiBriefcase /> },
  { to: "/profile/steps", label: "My Profile", icon: <FiUser /> },
  { to: "/interviews", label: "Interviews", icon: <FiClipboard /> },
  { to: "/assessments", label: "Assessments", icon: <FiLayers /> },
  { to: "/events", label: "Events", icon: <FiFileText /> },
  { to: "/resume", label: "Resume", icon: <FiFileText /> },
  { to: "/help", label: "Help", icon: <FiHelpCircle /> },
];

const employerItems = [
  { to: "/dashboard/employer", label: "Dashboard", icon: <FiHome /> },
  { to: "/dashboard/employer/applications", label: "Applications", icon: <FiUser /> },
  { to: "/my-jobs", label: "Manage Jobs", icon: <FiBriefcase /> },
  { to: "/jobs/create", label: "Post a Job", icon: <FiFileText /> },
  { to: "/profile/employer", label: "Company Profile", icon: <FiUser /> },
  { to: "/help", label: "Help", icon: <FiHelpCircle /> },
];

export default function Sidebar({ collapsed = false, user, completion }) {
  const navigate = useNavigate();
  const [showDropdown, setShowDropdown] = useState(false);

  // Calculate completion from user data if not provided as prop
  const calculatedCompletion = completion !== undefined ? completion : (user ? computeCompletion(user) : 0);
  const displayName = user?.firstName ? `${user.firstName} ${user.lastName || ""}` : "Guest User";
  const displayRole = user?.role === "employer" ? "Employer" : "Job Seeker";

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <aside className="w-72 min-h-screen bg-white/90 border-r border-gray-100 shadow-sm sticky top-0 flex flex-col">
      <div className="px-6 py-5 flex items-center gap-3">
        <div className="w-10 h-10 rounded-md overflow-hidden bg-white shadow">
          <img src={logo} alt="logo" className="w-full h-full object-cover" />
        </div>
        <div>
          <div className="text-lg font-semibold text-gray-800">WorkWave</div>
          <div className="text-xs text-gray-500">Career hub</div>
        </div>
      </div>

      <div className="px-4">
        <div className="bg-gradient-to-b from-white to-gray-50 rounded-lg p-3 border border-gray-100 relative">
          {/* Profile mini card */}
          <button
            onClick={() => setShowDropdown(!showDropdown)}
            className="flex items-center gap-3 px-2 py-3 w-full hover:bg-gray-50 rounded-lg transition"
          >
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-600 to-indigo-600 flex items-center justify-center text-white font-bold overflow-hidden">
              {user?.profilePhoto ? (
                <img src={user.profilePhoto} alt="Profile" className="w-full h-full object-cover" />
              ) : (
                <span>{user?.firstName?.[0] || "U"}</span>
              )}
            </div>
            <div className="overflow-hidden flex-1 text-left">
              <div className="text-sm font-semibold truncate" title={displayName}>{displayName}</div>
              <div className="text-xs text-gray-500">{displayRole}</div>
            </div>
            <FiChevronDown className={`text-gray-400 transition-transform ${showDropdown ? 'rotate-180' : ''}`} />
          </button>

          {/* Dropdown Menu */}
          {showDropdown && (
            <div className="absolute left-4 right-4 top-full mt-2 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
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

          {/* progress */}
          <div className="mt-3 px-2">
            <div className="flex justify-between text-xs text-gray-500 mb-1">
              <span>Profile completeness</span>
              <span>{calculatedCompletion}%</span>
            </div>
            <div className="w-full bg-gray-100 rounded-full h-2 overflow-hidden">
              <div
                className="h-2 bg-gradient-to-r from-purple-600 to-indigo-500 transition-all duration-500"
                style={{ width: `${calculatedCompletion}%` }}
              />
            </div>
          </div>
        </div>
      </div>

      <nav className="mt-6 flex-1">
        {(user?.role === "employer" ? employerItems : seekerItems).map((it) => (
          <NavLink
            key={it.to}
            to={it.to}
            className={({ isActive }) =>
              `flex items-center gap-3 px-6 py-3 text-sm hover:bg-purple-50 hover:text-purple-600 transition ${isActive
                ? "bg-purple-50 text-purple-700 font-semibold border-r-4 border-purple-600"
                : "text-gray-700"
              }`
            }
          >
            <span className="text-lg">{it.icon}</span>
            <span>{it.label}</span>
          </NavLink>
        ))}
      </nav>

      <div className="p-4">
        <div className="text-xs text-gray-500">Need help?</div>
        <a
          href="/help"
          className="inline-flex items-center gap-2 px-3 py-2 mt-2 rounded bg-gray-100 text-sm hover:bg-gray-200 transition w-full justify-center"
        >
          <FiHelpCircle /> Support
        </a>
      </div>
    </aside >
  );
}
