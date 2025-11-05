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
          {localStorage.getItem("studentId") && (
          <Route path="/mycourses" element={<MyCourses/>}/>
          )}
      </Routes>
    </>
  );
}
export default App;
