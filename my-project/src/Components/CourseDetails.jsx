import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "../css/CourseDetails.css";

const CourseDetails = () => {
  const { id } = useParams();
  const [course, setCourse] = useState(null);
  const [message, setMessage] = useState("");

  // Assume studentId is stored in localStorage after login
  const studentId = localStorage.getItem("studentId");

  useEffect(() => {
    axios.get(`http://localhost:5000/api/courses/${id}`)
      .then((res) => setCourse(res.data))
      .catch((err) => console.error(err));
  }, [id]);

  const handleEnroll = async () => {
    if (!studentId) {
      setMessage("Please login to enroll.");
      return;
    }

    try {
      const res = await axios.post(`http://localhost:5000/api/students/${studentId}/enroll/${id}`);
      setMessage(res.data.message);
    } catch (err) {
      setMessage(err.response?.data?.message || "Error enrolling course");
    }
  };

  if (!course) return <div className="loading">Loading...</div>;

  return (
    <div className="course-details-container">
      <h1>{course.name}</h1>
      <p><strong>Code:</strong> {course.code}</p>
      <p>{course.description}</p>
      <button className="enroll-btn" onClick={handleEnroll}>Enroll</button>
      {message && <p className="message">{message}</p>}
    </div>
  );
};

export default CourseDetails;
