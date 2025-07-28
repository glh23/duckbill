import React from "react";
import TopBar from '../../components/topbar/preLoginTopbar';
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
            Welcome to duckbill we sort out your bills so you don't have to.
          </p>
        </header>

        <main className="max-w-3xl mx-auto">
          <div className="card bg-base-100 shadow-xl">
            <div className="card-body">
              <h2 className="card-title">Hello, Ducker</h2>
              <p>
                Quack your bills with Duckbill! We help you manage your bills effortlessly, so you can focus on what really matters. 
                Whether you're looking to create an account or log in, we've got you covered.
              </p>
              <div className="card-actions justify-end">
                <button
                  className="btn btn-primary"
                  onClick={() => handleNavigate()}
                >
                  Login
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
