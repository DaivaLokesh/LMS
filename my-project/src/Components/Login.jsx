import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../css/Form.css";
function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post("http://localhost:5000/api/login", { email, password });
      alert(res.data.message);

      // ✅ Save student info in localStorage
      localStorage.setItem("studentId", res.data.studentId);
      localStorage.setItem("studentEmail", email);

      // ✅ Redirect to courses page
      navigate("/studentNavbar");
    } catch (err) {
      alert("Login failed. Please check your credentials.");
    }
  };

  return (
    <div className="form-container">
      <h2>Student Login</h2>
      <form onSubmit={handleSubmit}   >
        <label>Email:</label>
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />

        <label>Password:</label>
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />

        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default Login;
