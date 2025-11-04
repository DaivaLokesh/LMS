import React from "react";
import "../css/Home.css";
import Navbar from "./Navbar";

const Home = () => {
  <Navbar />;
  return (
    <div className="home-container">
      <section className="hero-section">
        <h1>Welcome to EduLearn LMS</h1>
        <p>
          Empower your learning journey with our interactive Learning Management System.
          Manage courses, track progress, and enhance collaboration between students and instructors.
        </p>
        <button className="cta-button">Get Started</button>
      </section>

      <section className="features">
        <h2>Our Key Features</h2>
        <div className="feature-list">
          <div className="feature-card">
            <h3>📚 Course Management</h3>
            <p>Instructors can create, manage, and organize courses effortlessly.</p>
          </div>
          <div className="feature-card">
            <h3>👩‍🏫 Student Dashboard</h3>
            <p>Students can access enrolled courses, grades, and assignments in one place.</p>
          </div>
          <div className="feature-card">
            <h3>🧾 Progress Tracking</h3>
            <p>Track learning progress and performance with detailed analytics and reports.</p>
          </div>
          <div className="feature-card">
            <h3>💬 Discussion Forums</h3>
            <p>Promote collaboration through group discussions and peer learning.</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
