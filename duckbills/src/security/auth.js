// This file handles authentication-related functions such as login, logout, and token refresh.
export async function refreshAccessToken() {
  const refreshToken = localStorage.getItem("refreshToken");
  if (!refreshToken) return false;

  try {
    const res = await fetch("http://localhost:5000/api/refresh", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ refreshToken }),
    });

    const data = await res.json();
    if (!res.ok) throw new Error(data.message || "Refresh failed");

    return true;
  } catch (err) {
    console.error("Refresh error:", err);
    localStorage.removeItem("refreshToken");
    return false;
  }
}

export function logout() {
  localStorage.removeItem("refreshToken");
  window.location.href = "/login";
}
