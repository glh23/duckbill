import { useState } from "react";
import { useNavigate } from "react-router-dom";
import TopBar from '../../components/topbar/preLoginTopbar';

export default function Login() {
  const [formData, setFormData] = useState({ username: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg("");

    try {
      const res = await fetch("http://localhost:5000/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Login failed");

      localStorage.setItem("refreshToken", data.refreshToken);
      window.location.href = "/dashboard";
    } catch (err) {
      setErrorMsg(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <TopBar />
      <div className="min-h-screen flex items-center justify-center bg-base-200">
        <div className="w-full max-w-sm p-6 rounded-2xl shadow-xl bg-base-100">
          <h2 className="text-2xl font-bold text-center mb-6 text-primary">Login</h2>
          {errorMsg && <div className="text-error text-center mb-2">{errorMsg}</div>}
          <form onSubmit={handleLogin}>
            <div className="form-control mb-4">
              <label className="label">Username</label>
              <input
                type="text"
                name="username"
                className="input input-bordered"
                value={formData.username}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-control mb-6">
              <label className="label">Password</label>
              <input
                type="password"
                name="password"
                className="input input-bordered"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>
            <button className="btn btn-primary w-full" disabled={loading}>
              {loading ? "Logging in..." : "Login"}
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
