import React, { useState } from "react";
import "./App.css";

export default function SignIn() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [status, setStatus] = useState("");

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setStatus("Loading...");
    try {
      const res = await fetch("http://localhost:5000/api/users/signin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form)
      });
      const data = await res.json();
      if (res.ok) {
        localStorage.setItem("token", data.token);
        // Save username for Navbar
        localStorage.setItem("username", data.username);
        // Generate or use existing user ID for better user identification
        let userId = localStorage.getItem('userId');
        if (!userId) {
          userId = `user_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
          localStorage.setItem('userId', userId);
        }
        setStatus("Sign in successful!");
        
        // Check if there's a redirect URL stored
        const redirectUrl = localStorage.getItem('redirectAfterLogin');
        if (redirectUrl) {
          localStorage.removeItem('redirectAfterLogin');
          window.location.href = redirectUrl;
        } else {
          window.location.href = "/";
        }
      } else {
        setStatus(data.message || "Sign in failed.");
      }
    } catch {
      setStatus("Network error.");
    }
  }

  return (
    <div className="auth-container">
      <div className="auth-box">
        <h2>Sign In</h2>
        <form onSubmit={handleSubmit}>
          <input name="email" type="email" className="input" placeholder="Email" value={form.email} onChange={handleChange} required />
          <input name="password" type="password" className="input" placeholder="Password" value={form.password} onChange={handleChange} required />
          <button type="submit" className="auth-btn">Sign In</button>
        </form>
        <div className="auth-link">
          Don't have an account? <a href="/signup">Sign Up</a>
        </div>
        <div style={{ color: "#d52c24", marginTop: "1em" }}>{status}</div>
      </div>
    </div>
  );
}
