import React, { useState } from "react";
import "./App.css";

export default function SignUp() {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [status, setStatus] = useState("");

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setStatus("Loading...");
    try {
      const res = await fetch("http://localhost:5000/api/users/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form)
      });
      const data = await res.json();
      if (res.ok) {
        // Generate unique user ID for new user
        const userId = `user_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
        localStorage.setItem('userId', userId);
        setStatus("Signup successful! Please sign in to continue.");
      } else {
        setStatus(data.message || "Signup failed.");
      }
    } catch {
      setStatus("Network error.");
    }
  }

  return (
    <div className="auth-container">
      <div className="auth-box">
        <h2>Sign Up</h2>
        <form onSubmit={handleSubmit}>
          <input name="name" className="input" placeholder="Full Name" value={form.name} onChange={handleChange} required />
          <input name="email" type="email" className="input" placeholder="Email" value={form.email} onChange={handleChange} required />
          <input name="password" type="password" className="input" placeholder="Password" value={form.password} onChange={handleChange} required />
          <button type="submit" className="auth-btn">Sign Up</button>
        </form>
        <div className="auth-link">
          Already have an account? <a href="/signin">Sign In</a>
        </div>
        <div style={{ color: "#d52c24", marginTop: "1em" }}>{status}</div>
      </div>
    </div>
  );
}
