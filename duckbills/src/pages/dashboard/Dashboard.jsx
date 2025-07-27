import { useEffect, useState } from "react";
import { secureFetch } from "../../security/secureFetch";
import { logout } from "../../security/auth";

export default function Dashboard() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    async function getUser() {
      try {
        const res = await secureFetch("http://localhost:5000/api/protected");
        const data = await res.json();

        if (res.ok) {
          setUser(data.user);
        } else {
          logout(); // if token expired & refresh failed
        }
      } catch (err) {
        console.error(err);
        logout();
      }
    }

    getUser();
  }, []);

  return (
    <div className="p-8 bg-base-100 min-h-screen">
      <h1 className="text-3xl font-bold text-primary mb-4">Dashboard</h1>
      {user ? (
        <div>
          <p className="text-lg">Welcome, <span className="font-semibold">{user.username}</span>!</p>
          <button className="btn btn-secondary mt-4" onClick={logout}>
            Logout
          </button>
        </div>
      ) : (
        <p className="text-base-content">Loading user...</p>
      )}
    </div>
  );
}
