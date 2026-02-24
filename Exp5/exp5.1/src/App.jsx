import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import React, { Suspense, lazy } from "react";
import "./exp-5.css";
import profilePic from "./assets/wallpaper.png";

const Dashboard = lazy(() => import("./Dashboard"));

function Navbar() {
  return (
    <div className="navbar">
      <h2 className="app-name">MyApp</h2>
      <div>
        <Link to="/">Profile</Link> |{" "}
        <Link to="/dashboard">Dashboard</Link>
      </div>
    </div>
  );
}

function Profile() {
  return (
    <div className="container">
      <div className="card">
        <h1>Profile Page</h1>

        <img src={profilePic} className="profile-img" alt="Profile" />

        <h2>Projects</h2>
        <ol className="list">
          <li>Speech Emotion Detector</li>
          <li>Heart Disease Analyzer</li>
        </ol>

        <h2>Achievements</h2>
        <ol className="list">
          <li>Scithon Hackathon Winner</li>
        </ol>
      </div>
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Navbar />

      <Suspense
        fallback={
          <div className="center-wrapper">
            <div className="card loading-card">
              <h1>Loading...</h1>
              <p>Please wait while the content loads.</p>
            </div>
          </div>
        }
      >
        <Routes>
          <Route path="/" element={<Profile />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;