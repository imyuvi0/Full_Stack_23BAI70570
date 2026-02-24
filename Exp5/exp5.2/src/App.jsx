import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import React, { Suspense, lazy } from "react";
import "./Dashboard.css";

// Lazy loading with visible delay
const Contact = lazy(() => {
  console.log("Lazy loading triggered...");
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(import("./Contact"));
    }, 4000); // 4 second delay so loading is clearly visible
  });
});

function Navbar() {
  return (
    <div className="navbar">
      <h2 className="app-name">MyApp</h2>
      <div>
        <Link to="/">About</Link> |{" "}
        <Link to="/contact">Contact</Link>
      </div>
    </div>
  );
}

function About() {
  return (
    <div className="container">
      <div className="card">
        <h1>About Page</h1>

      

        <h2>About Me</h2>
        <p>
          I am a full-stack developer passionate about building scalable
          and efficient web applications.
        </p>

        <h2>Skills</h2>
        <ol className="list">
          <li>Cpp</li>
          <li>React</li>
          <li>SQL</li>
          <li>Mongo DB</li>
        </ol>
      </div>
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Navbar />

      <Routes>
        <Route path="/" element={<About />} />

        {/* Suspense directly on lazy route */}
        <Route
          path="/contact"
          element={
            <Suspense
              fallback={
                <div className="center-wrapper">
                  <div className="card loading-card">
                    <h1>Loading...</h1>
                    <p>Contact page is loading</p>
                  </div>
                </div>
              }
            >
              <Contact />
            </Suspense>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;