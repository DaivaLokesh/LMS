import React from "react";
import "../css/About.css";
import Navbar from "./Navbar";

<Navbar />;
const About = () => {
  return (
    <div className="about-container">
      <h1>About EduLearn LMS</h1>
      <p>
        EduLearn is a cloud-based Learning Management System (LMS) designed to make education
        smarter and more accessible. It allows instructors to create engaging courses,
        students to learn at their own pace, and administrators to manage content easily.
      </p>

      <h2>Our Mission</h2>
      <p>
        To bridge the gap between learners and educators by providing an intuitive and efficient
        platform that enhances the learning experience and encourages continuous growth.
      </p>

      <h2>Why Choose EduLearn?</h2>
      <ul>
        <li>✔ Easy-to-use and responsive design</li>
        <li>✔ Secure login and personalized dashboards</li>
        <li>✔ Interactive course materials</li>
        <li>✔ Built-in progress tracking and grading system</li>
      </ul>
    </div>
  );
};

export default About;
