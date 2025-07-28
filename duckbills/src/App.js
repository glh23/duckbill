import React from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Home from "./pages/homepage/Homepage";
import Createaccount from "./pages/createaccount/Createaccount";
import Login from "./pages/login/Login";
import Dashboard from "./pages/dashboard/Dashboard";

import { AuthProvider } from "./security/authContext";
import ProtectedRoute from "./security/protectedRoute";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/create-account" element={<Createaccount />} />
          <Route path="/login" element={<Login />} />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
