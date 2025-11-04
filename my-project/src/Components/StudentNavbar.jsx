import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css";

function StudentNavbar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/courses" className="logo">LMS Portal</Link>

        <ul className="nav-links">
          <li><Link to="/courses">All Courses</Link></li>
          <li><Link to="/my-courses">My Courses</Link></li>
          <li><Link to="/profile">Profile</Link></li>
          <li><button onClick={handleLogout} className="logout-btn">Logout</button></li>
        </ul>
      </div>
    </nav>
  );
}

export default StudentNavbar;
