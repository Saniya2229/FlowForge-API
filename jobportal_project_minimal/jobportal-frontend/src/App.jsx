// src/App.jsx
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { setAuthToken } from "./api/api";

// Loader + Landing Page
import Loader from "./components/Loader";
import LandingPage from "./pages/LandingPage";

// Auth pages (DIRECT PAGES — NOT AuthPage)
import LoginJobseeker from "./pages/auth/LoginJobseeker";
import LoginEmployer from "./pages/auth/LoginEmployer";
import SignupJobseeker from "./pages/auth/SignupJobseeker";
import SignupEmployer from "./pages/auth/SignupEmployer";
import AuthPage from "./pages/auth/AuthPage";

// Protected wrapper
import ProtectedRoute from "./components/ProtectedRoute";

// Profile Steps (Job Seeker)
import ProfileSteps from "./pages/profile/ProfileSteps";

// Dashboards
import SeekerDashboard from "./pages/SeekerDashboard";
import EmployerDashboard from "./pages/EmployerDashboard";
import ApplicantTracking from "./pages/employer/ApplicantTracking";

// Employer Profile
import EmployerProfile from "./pages/EmployerProfile";

// Jobs Module
import JobsList from "./pages/jobs/JobsList";
import JobCreate from "./pages/jobs/JobCreate";
import JobEdit from "./pages/jobs/JobEdit";
import JobView from "./pages/jobs/JobView";
import MyJobs from "./pages/jobs/MyJobs";
import JobSearch from "./pages/jobs/JobSearch";

// Extra Pages
import Assessments from "./pages/Assessments";
import Events from "./pages/Events";
import Interviews from "./pages/Interviews";
import Resume from "./pages/Resume";

export default function App() {
  const [loading, setLoading] = useState(true);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    const fadeTimer = setTimeout(() => setFadeOut(true), 1700);
    const hideTimer = setTimeout(() => setLoading(false), 2000);

    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(hideTimer);
    };
  }, []);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) setAuthToken(token);
  }, []);

  if (loading) {
    return (
      <div
        className={`transition-opacity duration-500 ${fadeOut ? "opacity-0" : "opacity-100"
          }`}
      >
        <Loader />
      </div>
    );
  }

  return (
    <BrowserRouter>
      <div className="animate-fadeIn">
        <Routes>
          {/* Landing */}
          <Route path="/" element={<LandingPage />} />

          {/* AUTH ROUTES */}
          <Route path="/login/jobseeker" element={<LoginJobseeker />} />
          <Route path="/login/employer" element={<LoginEmployer />} />

          <Route path="/register/jobseeker" element={<SignupJobseeker />} />
          <Route path="/register/employer" element={<SignupEmployer />} />

          {/* Clean unified optional route */}
          <Route path="/auth/:mode/:role" element={<AuthPage />} />

          {/* Redirects */}
          <Route path="/login" element={<Navigate to="/login/jobseeker" />} />
          <Route
            path="/register"
            element={<Navigate to="/register/jobseeker" />}
          />

          {/* PROTECTED ROUTES */}
          <Route
            path="/profile/steps"
            element={
              <ProtectedRoute allowedRole="jobseeker">
                <ProfileSteps />
              </ProtectedRoute>
            }
          />
          <Route
            path="/dashboard/seeker"
            element={
              <ProtectedRoute allowedRole="jobseeker">
                <SeekerDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/find-jobs"
            element={
              <ProtectedRoute allowedRole="jobseeker">
                <JobSearch />
              </ProtectedRoute>
            }
          />
          <Route
            path="/dashboard/employer"
            element={
              <ProtectedRoute allowedRole="employer">
                <EmployerDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/dashboard/employer/applications"
            element={
              <ProtectedRoute allowedRole="employer">
                <ApplicantTracking />
              </ProtectedRoute>
            }
          />
          <Route
            path="/profile/employer"
            element={
              <ProtectedRoute allowedRole="employer">
                <EmployerProfile />
              </ProtectedRoute>
            }
          />
          <Route
            path="/jobs"
            element={
              <ProtectedRoute allowedRole="employer">
                <JobsList />
              </ProtectedRoute>
            }
          />
          <Route
            path="/my-jobs"
            element={
              <ProtectedRoute allowedRole="employer">
                <MyJobs />
              </ProtectedRoute>
            }
          />
          <Route
            path="/jobs/create"
            element={
              <ProtectedRoute allowedRole="employer">
                <JobCreate />
              </ProtectedRoute>
            }
          />
          <Route
            path="/jobs/:id/edit"
            element={
              <ProtectedRoute allowedRole="employer">
                <JobEdit />
              </ProtectedRoute>
            }
          />
          <Route
            path="/jobs/:id"
            element={
              <ProtectedRoute allowedRole="employer">
                <JobView />
              </ProtectedRoute>
            }
          />

          {/* Extra Pages */}
          <Route path="/assessments" element={<Assessments />} />
          <Route path="/events" element={<Events />} />
          <Route path="/interviews" element={<Interviews />} />
          <Route path="/resume" element={<Resume />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}
