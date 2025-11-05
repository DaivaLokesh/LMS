import { useNavigate } from "react-router-dom";

function AdminNavbar() {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <nav>
      <button onClick={() => navigate("/manage-users")}>Manage Users</button>
      <button onClick={() => navigate("/manage-courses")}>Manage Courses</button>
      <button onClick={logout}>Logout</button>
    </nav>
  );
}

export default AdminNavbar;
