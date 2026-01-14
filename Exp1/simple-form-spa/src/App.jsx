import { useState } from "react";
import "./App.css";

function App() {
  const [formData, setFormData] = useState({
    name: "",
    uid: "",
    age: "",
    email: "",
    contact: ""
  });

  const [submittedData, setSubmittedData] = useState(null);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmittedData(formData);
    setFormData({
      name: "",
      uid: "",
      age: "",
      email: "",
      contact: ""
    });
  };

  return (
    <div className="container">
      <div className="box">
        <h1>Simple Form SPA</h1>

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={formData.name}
            onChange={handleChange}
            required
          />

          <input
            type="text"
            name="uid"
            placeholder="UID"
            value={formData.uid}
            onChange={handleChange}
            required
          />

          <input
            type="number"
            name="age"
            placeholder="Age"
            value={formData.age}
            onChange={handleChange}
            required
          />

          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
          />

          <input
            type="tel"
            name="contact"
            placeholder="Contact No."
            value={formData.contact}
            onChange={handleChange}
            required
          />

          <button type="submit">Submit</button>
        </form>

        {submittedData && (
          <div className="output">
            <h3>Submitted Data</h3>
            <p><b>Name:</b> {submittedData.name}</p>
            <p><b>UID:</b> {submittedData.uid}</p>
            <p><b>Age:</b> {submittedData.age}</p>
            <p><b>Email:</b> {submittedData.email}</p>
            <p><b>Contact:</b> {submittedData.contact}</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
