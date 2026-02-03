import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import "./App.css";

function Profile() {
  return (
    <div className="page">
      <h1 className="title">Yuvraj Singh</h1>
      <p className="subtitle">
        B.Tech CSE (AI & ML) Student | Aspiring AI Engineer
      </p>

      <div className="card">
        <p><strong>University:</strong> Chandigarh University</p>
        <p><strong>Location:</strong> Punjab, India</p>
        <p><strong>Interests:</strong> Artificial Intelligence, Web Development, Problem Solving</p>
      </div>
    </div>
  );
}

function Dashboard() {
  return (
    <div className="page">
      <h1 className="title">Skills & Expertise</h1>

      <div className="card">
        <h2>Technical Skills</h2>
        <ul>
          <li>HTML, CSS, JavaScript</li>
          <li>React.js & React Router</li>
          <li>Python, C, C++</li>
          <li>SQL & Database Basics</li>
        </ul>
      </div>

      <div className="card">
        <h2>Academic & Professional</h2>
        <ul>
          <li>AI & Machine Learning Fundamentals</li>
          <li>Data Structures & Algorithms (Learning)</li>
          <li>Design Thinking & Innovation</li>
        </ul>
      </div>
    </div>
  );
}

function Contact() {
  return (
    <div className="page">
      <h1 className="title">Contact Information</h1>

      <div className="card">
        <p><strong>Email:</strong> yuvraj23bai70570@gmail.com</p>
        <p><strong>Address:</strong> Mohali, Punjab</p>
        <p><strong>LinkedIn:</strong> linkedin.com/in/yuvraj-singh</p>
      </div>
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <nav className="navbar">
        <Link to="/">Profile</Link>
        <Link to="/about">Skills</Link>
        <Link to="/contact">Contact</Link>
      </nav>

      <Routes>
        <Route path="/" element={<Profile />} />
        <Route path="/about" element={<Dashboard />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
