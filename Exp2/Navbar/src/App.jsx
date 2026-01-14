import React from "react";
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
function App() {
  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark container">
        <div className="container-fluid">

          {/* Brand */}
          <a className="navbar-brand" href="#">
            MyWebsite
          </a>

          {/* Toggle Button for Mobile */}
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          {/* Navbar Links */}
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <a className="nav-link active" href="#">
                  Home
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">
                  About
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">
                  Services
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">
                  Contact
                </a>
              </li>
            </ul>
          </div>

        </div>
      </nav>
    </>
  );
}

export default App;
