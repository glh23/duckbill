import React, { useState } from "react";
import TopBar from '../../components/topbar/topbar';
import { useNavigate } from "react-router-dom";

export default function CreateAccount() {
  const [form, setForm] = useState({ email: "", username: "", password: "" });
  const [message, setMessage] = useState("");

  const apiUrl = process.env.REACT_APP_API_URL;

  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Handle register form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    const { email, username, password } = form;

    // Null checks
    if (!email || !username || !password) {setMessage("Please fill out all fields.");return;}
    // Password validation
    if (password.length < 12) {setMessage("Password must be at least 12 characters long.");return;}
    if(password.length > 32) {setMessage("Password must be at most 32 characters long.");return;}
    if(password.includes(" ")) {setMessage("Password cannot contain spaces.");return;}
    if(password.includes(username)) {setMessage("Password cannot contain your username.");return;}
    if(password.includes(email)) {setMessage("Password cannot contain your email.");return;}
    if(password.includes("duckbill")) {setMessage("Password cannot contain the word 'duckbill'.");return;}
    if(!/[A-Z]/.test(password)) {setMessage("Password must contain at least one uppercase letter.");return;}
    if(!/[a-z]/.test(password)) {setMessage("Password must contain at least one lowercase letter.");return;}
    if(!/\d/.test(password)) {setMessage("Password must contain at least one number.");return;}
    if(!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {setMessage("Password must contain at least one special character.");return;}
    // Username validation
    if(!/^[a-zA-Z0-9]+$/.test(username)) {setMessage("Username can only contain letters and numbers.");return;}
    if(username.length < 3) {setMessage("Username must be at least 3 characters long.");return;}
    if(username.length > 20) {setMessage("Username must be at most 20 characters long.");return;}
    if(username.includes(" ")) {setMessage("Username cannot contain spaces.");return;}
    // Email validation
    if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {setMessage("Please enter a valid email address.");return;}
    if(email.length < 5) {setMessage("Email must be at least 5 characters long.");return;}
    if(email.length > 320) {setMessage("Email must be at most 320 characters long.");return;}
    if(email.includes(" ")) {setMessage("Email cannot contain spaces.");return;}


    try {
      // Send registration request
      const res = await fetch(`${apiUrl}/api/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, username, password }),
      });

      const data = await res.json();

      if (res.ok) {
        setMessage("Account created successfully!");
        setForm({ email: "", username: "", password: "" });
      } else {
        setMessage(data.error || "Something went wrong.");
      }
    } catch (err) {
      setMessage("Network error: " + err.message);
    }
  };

  return (
    <>
    <TopBar />
    <div className="max-w-md mx-auto mt-12 p-6 bg-base-200 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-primary-content">Create Account</h2>

      {message && (
        <div className="mb-4 p-3 rounded text-center bg-accent text-accent-content">
          {message}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1 font-semibold text-primary-content" htmlFor="email">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            className="input input-bordered w-full"
            value={form.email}
            onChange={handleChange}
            placeholder="you@example.com"
            required
          />
        </div>

        <div>
          <label className="block mb-1 font-semibold text-primary-content" htmlFor="username">
            Username
          </label>
          <input
            id="username"
            name="username"
            type="text"
            className="input input-bordered w-full"
            value={form.username}
            onChange={handleChange}
            placeholder="your username"
            required
          />
        </div>

        <div>
          <label className="block mb-1 font-semibold text-primary-content" htmlFor="password">
            Password
          </label>
          <input
            id="password"
            name="password"
            type="password"
            className="input input-bordered w-full"
            value={form.password}
            onChange={handleChange}
            placeholder="Your password"
            required
          />
        </div>

        <button
          type="submit"
          className="btn btn-primary w-full mt-4"
        >
          Create Account
        </button>
      </form>
    </div>
    </>
  );
}
