// src/components/Courses.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import "../css/Courses.css";
import { Link } from "react-router-dom";

const Courses = () => {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/api/courses")
      .then((res) => setCourses(res.data))
      .catch((err) => console.error("Error fetching courses:", err));
  }, []);

  return (
    <div className="courses-container">
      <h1 className="page-title">Available Courses</h1>
      <div className="courses-grid">
        {courses.map((course) => (
          <div className="course-card" key={course._id}>
            <h2>{course.name}</h2>
            <p><strong>Code:</strong> {course.code}</p>
            <p className="course-desc">{course.description}</p>
            <Link to={`/courses/${course._id}`} className="details-btn">
              View Details
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Courses;
