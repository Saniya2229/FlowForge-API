// src/pages/auth/SignupEmployer.jsx
import React, { useState } from "react";
import { signup } from "../../api/auth";
import { useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FiBriefcase, FiMail, FiLock, FiArrowRight } from "react-icons/fi";

export default function SignupEmployer() {
  const nav = useNavigate();
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSignup = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await signup({
        name: form.name,
        email: form.email,
        password: form.password,
        role: "employer",
      });

      nav("/auth/login/employer");
    } catch (err) {
      alert(err?.response?.data?.message || "Signup failed");
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-purple-900 to-indigo-900 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 pointer-events-none">
        <div className="absolute top-[-10%] right-[-10%] w-96 h-96 bg-purple-500/30 rounded-full blur-[100px]" />
        <div className="absolute bottom-[-10%] left-[-10%] w-96 h-96 bg-indigo-500/30 rounded-full blur-[100px]" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white/10 backdrop-blur-lg border border-white/20 p-8 rounded-2xl shadow-xl w-full max-w-md z-10"
      >
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-white mb-2">Employer Signup</h2>
          <p className="text-gray-300">Start hiring top talent today</p>
        </div>

        {/* Role Switcher */}
        <div className="flex bg-black/20 p-1 rounded-lg mb-6">
          <Link
            to="/auth/register/jobseeker"
            className="flex-1 py-2 text-gray-400 hover:text-white text-center text-sm font-medium transition-colors"
          >
            Job Seeker
          </Link>
          <button className="flex-1 py-2 bg-purple-600 text-white rounded-md text-sm font-medium shadow-sm transition-all">
            Employer
          </button>
        </div>

        <form onSubmit={handleSignup} className="space-y-5">
          <div className="space-y-2">
            <label className="text-sm text-gray-300 ml-1">Company Name</label>
            <div className="relative">
              <FiBriefcase className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                name="name"
                placeholder="Acme Corp"
                className="w-full pl-10 pr-4 py-3 bg-black/20 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm text-gray-300 ml-1">Email Address</label>
            <div className="relative">
              <FiMail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                name="email"
                type="email"
                placeholder="hr@company.com"
                className="w-full pl-10 pr-4 py-3 bg-black/20 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm text-gray-300 ml-1">Password</label>
            <div className="relative">
              <FiLock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                name="password"
                type="password"
                placeholder="Create a password"
                className="w-full pl-10 pr-4 py-3 bg-black/20 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <button
            disabled={loading}
            className="w-full py-3 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white rounded-lg font-semibold shadow-lg shadow-purple-500/30 transition-all flex items-center justify-center gap-2 group disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {loading ? (
              "Creating Account..."
            ) : (
              <>
                Sign Up <FiArrowRight className="group-hover:translate-x-1 transition-transform" />
              </>
            )}
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-gray-400 text-sm">
            Already have an account?{" "}
            <Link
              to="/auth/login/employer"
              className="text-purple-400 hover:text-purple-300 font-medium transition-colors"
            >
              Login
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
}
