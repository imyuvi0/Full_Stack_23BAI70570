import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import "./App.css";

function NavButtons() {
  const navigate = useNavigate();

  return (
    <div className="button-bar">
      <button onClick={() => navigate("/")} className="nav-btn">
        Profile
      </button>
      <button onClick={() => navigate("/skills")} className="nav-btn">
        Skills
      </button>
      <button onClick={() => navigate("/contact")} className="nav-btn">
        Contact
      </button>
    </div>
  );
}

function Profile() {
  return (
    <div className="page">
      <NavButtons />

      <h1 className="title">Yuvraj Singh</h1>
      <p className="subtitle">
        B.Tech CSE (AI & ML) Student | Aspiring AI Engineer
      </p>

      <div className="card">
        <p><strong>University:</strong> Chandigarh University</p>
        <p><strong>Location:</strong> Punjab, India</p>
        <p><strong>Focus Areas:</strong> Artificial Intelligence, Web Development</p>
      </div>
    </div>
  );
}

function Skills() {
  return (
    <div className="page">
      <NavButtons />

      <h1 className="title">Skills</h1>

      <div className="card">
        <ul>
          <li>HTML, CSS, JavaScript</li>
          <li>React & React Router</li>
          <li>Python, C, C++</li>
          <li>SQL & Database Basics</li>
        </ul>
      </div>
    </div>
  );
}

function Contact() {
  return (
    <div className="page">
      <NavButtons />

      <h1 className="title">Contact</h1>

      <div className="card">
        <p><strong>Email:</strong> yuvraj23bai70570@gmail.com</p>
        <p><strong>Location:</strong> Mohali, Punjab</p>
      </div>
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Profile />} />
        <Route path="/skills" element={<Skills />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
