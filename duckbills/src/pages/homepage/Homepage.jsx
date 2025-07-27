import React from "react";
import TopBar from '../../components/topbar/topbar';
import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate("/login");
  }

  const handleNavigate2 = () => {
    navigate("/create-account");
  }

  return (
    <>
      <TopBar />
      <div className="min-h-screen bg-base-200 p-8">
        <header className="mb-8">
          <h1 className="text-4xl font-bold text-center">Welcome to Duckbill</h1>
          <p className="text-center mt-4 text-lg max-w-xl mx-auto text-base-content/70">
            We are a bills management company making your life easier.
          </p>
        </header>

        <main className="max-w-3xl mx-auto">
          <div className="card bg-base-100 shadow-xl">
            <div className="card-body">
              <h2 className="card-title">Hello, DaisyUI!</h2>
              <p>Welcome to duckbill we sort out your bills so you don't have to.</p>
              <div className="card-actions justify-end">
                <button
                  className="btn btn-primary"
                  onClick={() => handleNavigate()}
                >
                  Get Started
                </button>
                <button
                  className="btn btn-primary"
                  onClick={() => handleNavigate2()}
                >
                  Get Started
                </button>
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}
