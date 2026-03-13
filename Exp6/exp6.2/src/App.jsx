import React, { useState } from 'react';
import './App.css';

const App = () => {
  // --- AUTHENTICATION STATE ---
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loginData, setLoginData] = useState({ email: '', password: '' });
  const [loginError, setLoginError] = useState('');

  // Hardcoded unique credentials
  const VALID_EMAIL = "admin@gmail.com";
  const VALID_PASSWORD = "Admin@123";

  // --- REGISTRATION FORM STATE ---
  const [formData, setFormData] = useState({
    firstName: '', lastName: '', gender: '', dob: '',
    age: '', skills: [], address: '', state: ''
  });

  const skillOptions = ['C++', 'Java', 'Python', 'React', 'Node.js', 'SQL'];
  const states = ['Punjab', 'Haryana', 'UP', 'Rajasthan', 'Himachal Pradesh'];

  // --- LOGIN HANDLERS ---
  const handleLoginChange = (e) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
    setLoginError(''); // Clear error when typing
  };

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    const { email, password } = loginData;

    // 1. Email Validation (Must contain '@' and '.com')
    if (!email.includes('@') || !email.includes('.com')) {
      setLoginError("Email must contain '@' and '.com'");
      return;
    }

    // 2. Password Validation Regex (min 8 chars, 1 uppercase, 1 lowercase, 1 number, 1 special char)
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!passwordRegex.test(password)) {
      setLoginError("Password must be at least 8 characters long, contain 1 uppercase, 1 lowercase, 1 number, and 1 special character.");
      return;
    }

    // 3. Credential Check
    if (email === VALID_EMAIL && password === VALID_PASSWORD) {
      // Trigger the success alert here!
      alert("Successfully logged in!"); 
      
      setIsLoggedIn(true);
      setLoginError('');
    } else {
      setLoginError("Invalid email or password. Hint: admin@gmail.com / Admin@123");
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setLoginData({ email: '', password: '' }); // Clear login fields
  };

  // --- REGISTRATION FORM HANDLERS ---
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === 'checkbox') {
      const updatedSkills = checked
        ? [...formData.skills, value]
        : formData.skills.filter((skill) => skill !== value);
      setFormData({ ...formData, skills: updatedSkills });
    } else {
      setFormData({ ...formData, [name]: value });
    }

    if (name === 'dob') {
      calculateAge(value);
    }
  };

  const calculateAge = (birthDate) => {
    if (!birthDate) return;
    const today = new Date();
    const birth = new Date(birthDate);
    let age = today.getFullYear() - birth.getFullYear();
    const m = today.getMonth() - birth.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birth.getDate())) {
      age--;
    }
    setFormData((prev) => ({ ...prev, age: age >= 0 ? age : 0 }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const summary = `
      Name: ${formData.firstName} ${formData.lastName}
      Gender: ${formData.gender}
      DOB: ${formData.dob}
      Age: ${formData.age}
      Skills: ${formData.skills.join(', ')}
      Address: ${formData.address}
      State: ${formData.state}
    `;
    alert(summary);
  };

  const handleCancel = () => {
    setFormData({
      firstName: '', lastName: '', gender: '', dob: '',
      age: '', skills: [], address: '', state: ''
    });
  };

  const today = new Date().toISOString().split('T')[0];

  // --- CONDITIONAL RENDERING ---
  
  // If not logged in, show the Login Form
  if (!isLoggedIn) {
    return (
      <div className="container">
        <form className="form-card login-card" onSubmit={handleLoginSubmit}>
          <h2>Secure Login</h2>
          
          {loginError && <div className="error-message">{loginError}</div>}
          
          <div className="input-group login-group">
            <label>Email ID</label>
            <input 
              type="text" 
              name="email" 
              placeholder="Enter your email" 
              value={loginData.email} 
              onChange={handleLoginChange} 
              required 
            />
          </div>

          <div className="input-group login-group">
            <label>Password</label>
            <input 
              type="password" 
              name="password" 
              placeholder="Enter your password" 
              value={loginData.password} 
              onChange={handleLoginChange} 
              required 
            />
          </div>

          <button type="submit" className="btn-submit login-btn">Login to Access Form</button>
        </form>
      </div>
    );
  }

  // If logged in, show the Registration Form
  return (
    <div className="container">
      {/* Logout button positioned at the top right */}
      <button className="btn-logout" onClick={handleLogout}>Logout</button>
      
      <form className="form-card" onSubmit={handleSubmit}>
        <h2>Registration Form</h2>

        <div className="row">
          <input type="text" name="firstName" placeholder="First Name" value={formData.firstName} onChange={handleChange} required />
          <input type="text" name="lastName" placeholder="Last Name" value={formData.lastName} onChange={handleChange} required />
        </div>

        <div className="group">
          <label>Gender</label>
          <div className="gender-selection">
            {['Male', 'Female', 'Other'].map((g) => (
              <label key={g} className={`radio-label ${formData.gender === g ? 'selected' : ''}`}>
                <input type="radio" name="gender" value={g} checked={formData.gender === g} onChange={handleChange} />
                {g}
              </label>
            ))}
          </div>
        </div>

        <div className="row">
          <div className="input-group">
            <label>DOB:</label>
            <input type="date" name="dob" max={today} value={formData.dob} onChange={handleChange} required />
          </div>
          <div className="input-group">
            <label>Age:</label>
            <input type="text" name="age" value={formData.age} readOnly placeholder="Auto-calculated" />
          </div>
        </div>

        <div className="group">
          <label>Skills (B.Tech CSE):</label>
          <div className="checkbox-grid">
            {skillOptions.map(skill => (
              <label key={skill}>
                <input type="checkbox" name="skills" value={skill} onChange={handleChange} /> {skill}
              </label>
            ))}
          </div>
        </div>

        <textarea name="address" placeholder="Full Address" value={formData.address} onChange={handleChange} required />

        <select name="state" value={formData.state} onChange={handleChange} required>
          <option value="">Select State</option>
          {states.map(s => <option key={s} value={s}>{s}</option>)}
        </select>

        <div className="btn-group">
          <button type="submit" className="btn-submit">Submit</button>
          <button type="button" className="btn-cancel" onClick={handleCancel}>Cancel</button>
        </div>
      </form>
    </div>
  );
};

export default App;