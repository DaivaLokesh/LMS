import { useNavigate } from "react-router-dom";
function InstructorNavbar() {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <nav>
      <button onClick={() => navigate("/add-content")}>Add Content</button>
      <button onClick={() => navigate("/add-assignment")}>Add Assignment</button>
      <button onClick={logout}>Logout</button>
    </nav>
  );
}

export default InstructorNavbar;
