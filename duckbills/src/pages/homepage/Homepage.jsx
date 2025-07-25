import React from "react";
import TopBar from '../../components/topbar/topbar';

export default function Home() {
  return (
    <>
      <TopBar />
      <div className="min-h-screen bg-base-200 p-8">
        <header className="mb-8">
          <h1 className="text-4xl font-bold text-center">Welcome to Duckbill</h1>
        </header>

        <main className="max-w-3xl mx-auto">
          <div className="card bg-base-100 shadow-xl">
            <div className="card-body">
              <h2 className="card-title">Hello, DaisyUI!</h2>
              <p>This is your basic homepage styled with Tailwind CSS and DaisyUI components.</p>
              <div className="card-actions justify-end">
                <button className="btn btn-primary">Get Started</button>
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}
