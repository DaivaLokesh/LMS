import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "../css/CourseContent.css";

const CourseContent = () => {
  const { id } = useParams();
  const [course, setCourse] = useState(null);

  useEffect(() => {
    axios.get(`http://localhost:5000/api/courses/${id}`)
      .then((res) => setCourse(res.data))
      .catch((err) => console.error(err));
  }, [id]);

  if (!course) return <p>Loading course content...</p>;

  return (
    <div className="course-content-container">
      <h1>{course.name}</h1>
      <p><strong>Code:</strong> {course.ccode}</p>
      <p>{course.description}</p>

      <h3>Resources:</h3>
      {course.resources && course.resources.length > 0 ? (
        <div className="resources-grid">
          {course.resources.map((res, idx) => (
            <a
              key={idx}
              href={res.url}
              target="_blank"
              rel="noreferrer"
              className={`resource-card ${res.type}`}
            >
              {res.title} ({res.type})
            </a>
          ))}
        </div>
      ) : (
        <p>No resources available yet.</p>
      )}
    </div>
  );
};

export default CourseContent;
