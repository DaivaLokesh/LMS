import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import Navbar from "./Components/Navbar";
import StudentNavbar from "./Components/StudentNavbar";
import Register from "./Components/Register";
import Login from "./Components/Login";
import Courses from "./Components/Courses";
import CourseDetails from "./Components/CourseDetails";
import ProtectedRoute from "./Components/ProtectedRoute";
import About from "./Components/About";
import Home from "./Components/Home";
import MyCourses from "./Components/MyCourses";
import InstructorNavbar from "./Components/InstructorNavbar";
import AdminNavbar from "./Components/AdminNavbar";
import AddContent from "./Components/AddContent";
import AddAssignment from "./Components/AddAssignment";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setIsLoggedIn(!!localStorage.getItem("studentId"));
  }, [location]);

  return (
    <>
      {isLoggedIn ? <StudentNavbar /> : <Navbar />}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/courses"
          element={
            <ProtectedRoute>
              <Courses />
            </ProtectedRoute>
          }
          />
        <Route
          path="/courses/:id"
          element={
            <ProtectedRoute>
              <CourseDetails />
            </ProtectedRoute>
          }
          />
          <Route path="/mycourses" element={<MyCourses />} /> {/* Enrolled courses */}
          {localStorage.getItem("studentId") && (
          <Route path="/mycourses" element={<MyCourses/>}/>
          )}

          <Route path="/instructorNavbar" element={<InstructorNavbar />}/>
        <Route path="/add-content" element={<AddContent/>} />
        <Route path="/add-assignment" element={<AddAssignment/>} />
        <Route path="/courses/:id/add-content" element={<AddContent />} />
        <Route path="/courses/:id/add-assignment" element={<AddAssignment />} />

        {/* Admin */}
        <Route path="/adminNavbar" element={<ProtectedRoute role="admin"><AdminNavbar /></ProtectedRoute>} />
      </Routes>
    </>
  );
}
export default App;
