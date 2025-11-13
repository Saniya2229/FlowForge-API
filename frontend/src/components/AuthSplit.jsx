import React, { useState } from "react";
import API from "../api";

export default function AuthSplit() {
  const [isLogin, setIsLogin] = useState(true);
  const [form, setForm] = useState({
    email: "",
    password: "",
    role: "jobseeker",
  });
  const [step, setStep] = useState(1);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleNext = () => {
    if (form.email.trim() !== "") setStep(2);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = isLogin ? "/auth/login" : "/auth/register";
      const res = await API.post(url, form);
      alert(res.data.message || "Success!");
    } catch (err) {
      alert(err.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-left">
        <div>
          <h1>Find Your Next Opportunity, Faster 🚀</h1>
        </div>
      </div>

      <div className="auth-right">
        <div className="auth-form">
          <h2>{isLogin ? "Welcome Back 👋" : "Create an Account"}</h2>

          <form onSubmit={handleSubmit}>
            <div className="input-group">
              <input
                type="email"
                name="email"
                placeholder="Enter your email"
                value={form.email}
                onChange={handleChange}
                required
              />
            </div>

            {step === 2 && (
              <>
                <div className="input-group">
                  <input
                    type="password"
                    name="password"
                    placeholder="Enter password"
                    value={form.password}
                    onChange={handleChange}
                    required
                  />
                </div>

                {!isLogin && (
                  <div className="input-group">
                    <select
                      name="role"
                      value={form.role}
                      onChange={handleChange}
                    >
                      <option value="jobseeker">Job Seeker</option>
                      <option value="employer">Recruiter / Employer</option>
                    </select>
                  </div>
                )}

                {isLogin && (
                  <div className="forgot-password">
                    <a href="#">Forgot Password?</a>
                  </div>
                )}

                <button type="submit">{isLogin ? "Login" : "Register"}</button>
              </>
            )}

            {step === 1 && (
              <button type="button" onClick={handleNext}>
                Next →
              </button>
            )}
          </form>

          <div className="social-buttons">
            <div className="social-btn google">Continue with Google</div>
            <div className="social-btn linkedin">Continue with LinkedIn</div>
          </div>

          <div className="toggle-text">
            {isLogin ? (
              <>
                New here?{" "}
                <span
                  onClick={() => {
                    setIsLogin(false);
                    setStep(1);
                  }}
                >
                  Create an account
                </span>
              </>
            ) : (
              <>
                Already have an account?{" "}
                <span
                  onClick={() => {
                    setIsLogin(true);
                    setStep(1);
                  }}
                >
                  Login
                </span>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
