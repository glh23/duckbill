import React, { useEffect, useState } from "react";
import { Sun, Moon } from "lucide-react";

export default function Topbar() {
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") || "light";
    setTheme(savedTheme);
    document.documentElement.setAttribute("data-theme", savedTheme);
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    document.documentElement.setAttribute("data-theme", newTheme);
    localStorage.setItem("theme", newTheme);
  };

  return (
    <div className="w-full p-4 bg-base-300 flex justify-between items-center">
      <h1 className="text-xl font-bold">Duckbill</h1>

      <button
        className="btn btn-primary btn-sm p-2 rounded-full flex items-center justify-center"
        onClick={toggleTheme}
        aria-label="Toggle theme"
      >
        {theme === "light" ? (
          <Moon size={20} className="text-primary-content" />
        ) : (
          <Sun size={20} className="text-primary-content" />
        )}
      </button>
    </div>
  );
}