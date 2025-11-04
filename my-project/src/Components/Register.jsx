import { useState } from "react";
import axios from "axios";
import "../css/Form.css";

function Register() {
  const [student, setStudent] = useState({ name: "", email: "", password: "" });

  const handleChange = (e) => {
    setStudent({ ...student, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/api/register", student);
      alert("Registered successfully!");
      setStudent({ name: "", email: "", password: "" });
    } catch (err) {
      alert("Error: " + err.response?.data?.message);
    }
  };

  return (
    <div className="form-container">
      <h2>Student Registration</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" name="name" placeholder="Full Name" value={student.name} onChange={handleChange} required />
        <input type="email" name="email" placeholder="Email" value={student.email} onChange={handleChange} required />
        <input type="password" name="password" placeholder="Password" value={student.password} onChange={handleChange} required />
        <button type="submit">Register</button>
      </form>
      <div className="form-footer">
        <p>Already have an account? <a href="/login">Login here</a></p>
      </div>
    </div>
  );
}

export default Register;
