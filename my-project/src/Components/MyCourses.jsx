import React, { useEffect, useState } from "react";
import axios from "axios";
import "../css/MyCourses.css";

const MyCourses = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  const studentId = localStorage.getItem("studentId");

  useEffect(() => {
    const fetchEnrolledCourses = async () => {
      if (!studentId) {
        setMessage("Please login to view your courses.");
        setLoading(false);
        return;
      }

      try {
        const res = await axios.get(`http://localhost:5000/api/enrollments/${studentId}`);
        setCourses(res.data);
      } catch (err) {
        setMessage("Error fetching your courses.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchEnrolledCourses();
  }, [studentId]);

  if (loading) return <div className="loading">Loading...</div>;

  return (
    <div className="mycourses-container">
      <h2>🎓 My Enrolled Courses</h2>
      {message && <p className="message">{message}</p>}

      {courses.length === 0 ? (
        <p className="no-courses">You have not enrolled in any courses yet.</p>
      ) : (
        <div className="courses-grid">
          {courses.map((course) => (
            <div key={course._id} className="course-card">
              <h3>{course.name}</h3>
              <p><strong>Code:</strong> {course.code}</p>
              <p>{course.description}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyCourses;
