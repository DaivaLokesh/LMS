// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import "../css/Courses.css"; // Reuse same styling if you like
// import { Link } from "react-router-dom";

// const MyCourses = () => {
//   const [courses, setCourses] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");

//   const studentId = localStorage.getItem("studentId");

//   useEffect(() => {
//     if (!studentId) {
//       setError("Please log in to view your enrolled courses.");
//       setLoading(false);
//       return;
//     }

//     const fetchEnrolledCourses = async () => {
//       try {
//         const res = await axios.get(`http://localhost:5000/api/enrollments/${studentId}`);
//         setCourses(res.data);
//       } catch (err) {
//         setError("Error fetching enrolled courses");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchEnrolledCourses();
//   }, [studentId]);

//   if (loading) return <p>Loading enrolled courses...</p>;
//   if (error) return <p style={{ color: "red" }}>{error}</p>;

//   return (
//     <div className="courses-grid">
//   {courses.map((course) => (
//     <Link 
//       key={course._id} 
//       to={`/courses/${course._id}`} 
//       className="course-card-link"
//       style={{ textDecoration: "none", color: "inherit" }}
//     >
//       <div className="course-card">
//         <h3>{course.name}</h3>
//         <p>Code: {course.ccode}</p>
//         <p>{course.description}</p>
//       </div>
//     </Link>
//   ))}
// </div>

//   );
// };

// export default MyCourses;
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "../css/MyCourses.css";

const MyCourses = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const studentId = localStorage.getItem("studentId");

  useEffect(() => {
    if (!studentId) return;

    const fetchEnrolledCourses = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/enrollments/${studentId}`);
        setCourses(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchEnrolledCourses();
  }, [studentId]);

  if (loading) return <p>Loading enrolled courses...</p>;

  return (
    <div className="courses-container">
      <h2>My Enrolled Courses</h2>
      {courses.length === 0 ? (
        <p>You haven't enrolled in any courses yet.</p>
      ) : (
        <div className="courses-grid">
          {courses.map((course) => (
            <Link
              key={course._id}
              to={`/course-content/${course._id}`}
              className="course-card-link"
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <div className="course-card">
                <h3>{course.name}</h3>
                <p><strong>Code:</strong> {course.ccode}</p>
                <p>{course.description}</p>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyCourses;

