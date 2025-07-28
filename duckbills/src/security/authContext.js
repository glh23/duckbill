import React, { createContext, useContext, useEffect, useState } from "react";
import { refreshAccessToken, logout } from "./auth";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function checkAuth() {
      try {
        const res = await fetch("http://localhost:5000/api/protected", {
          credentials: "include",
        });

        if (res.ok) {
            console.log("User is authenticated and token is valid.");
          const data = await res.json();
          setUser(data.user);
        } else {
          const refreshed = await refreshAccessToken();
          if (refreshed) {
            const retry = await fetch("http://localhost:5000/api/protected", {
              credentials: "include",
            });
            if (retry.ok) {
                console.log("Token refreshed successfully, retrying request.");
              const data = await retry.json();
              setUser(data.user);
            } else {
              logout();
            }
          } else {
            logout();
          }
        }
      } catch (err) {
        console.error("Auth check failed:", err);
        logout();
      } finally {
        setLoading(false);
      }
    }

    checkAuth();
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
