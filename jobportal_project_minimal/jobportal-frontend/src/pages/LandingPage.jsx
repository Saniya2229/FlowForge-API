// src/pages/LandingPage.jsx
import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FiArrowRight, FiBriefcase, FiUser } from "react-icons/fi";

const LandingPage = () => {
  return (
    <div className="relative overflow-hidden min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-indigo-900 text-white">
      {/* Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-indigo-500/30 rounded-full blur-[100px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-96 h-96 bg-purple-500/30 rounded-full blur-[100px]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-500/10 rounded-full blur-[120px]" />
      </div>

      <nav className="relative z-10 w-full flex justify-between items-center px-6 md:px-12 py-6">
        <div className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-indigo-400 flex items-center gap-2">
          ⚡ WorkWave
        </div>

        <div className="flex gap-4">
          <Link to="/auth/login/jobseeker">
            <button className="px-5 py-2 rounded-full border border-white/20 hover:bg-white/10 transition-all text-sm font-medium">
              Job Seeker
            </button>
          </Link>
          <Link to="/auth/login/employer">
            <button className="px-5 py-2 rounded-full bg-white text-purple-900 hover:bg-gray-100 transition-all text-sm font-bold shadow-lg shadow-purple-500/20">
              Employer
            </button>
          </Link>
        </div>
      </nav>

      <section className="relative z-10 flex flex-col items-center text-center mt-20 px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6">
            Find Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">Perfect Opportunity</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto mb-10 leading-relaxed">
            Connecting Job Seekers and Employers with a modern, seamless experience.
            Your next career move or top hire is just a click away.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="flex flex-col md:flex-row gap-6"
        >
          <Link
            to="/auth/register/jobseeker"
            className="group relative px-8 py-4 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-xl font-bold text-lg shadow-xl shadow-purple-500/30 hover:shadow-purple-500/50 transition-all overflow-hidden"
          >
            <div className="absolute inset-0 bg-white/20 group-hover:translate-x-full transition-transform duration-500 ease-out -skew-x-12 -translate-x-full" />
            <span className="relative flex items-center gap-2">
              <FiUser /> Join as Job Seeker
            </span>
          </Link>

          <Link
            to="/auth/register/employer"
            className="group px-8 py-4 bg-white/10 border border-white/20 backdrop-blur-sm rounded-xl font-bold text-lg hover:bg-white/20 transition-all"
          >
            <span className="flex items-center gap-2">
              <FiBriefcase /> Hire Talent <FiArrowRight className="group-hover:translate-x-1 transition-transform" />
            </span>
          </Link>
        </motion.div>

        {/* Stats or Features (Optional Visuals) */}
        <div className="mt-24 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {[
            { label: "Active Jobs", value: "10k+" },
            { label: "Companies", value: "500+" },
            { label: "Job Seekers", value: "1M+" },
          ].map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 + i * 0.1 }}
              viewport={{ once: true }}
              className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md"
            >
              <div className="text-3xl font-bold text-white mb-1">{stat.value}</div>
              <div className="text-gray-400 text-sm">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default LandingPage;
