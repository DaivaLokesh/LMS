import express from "express";
import Enrollment from "../models/Enrollment.js";
import Course from "../models/Course.js";

const router = express.Router();

// Get all enrolled courses for a student
router.get("/:studentId/enrolled", async (req, res) => {
  try {
    const { studentId } = req.params;

    // Get enrollments and populate course details
    const enrollments = await Enrollment.find({ studentId })
      .populate("courseId");

    if (!enrollments.length) {
      return res.status(404).json({ message: "No enrolled courses found." });
    }

    const courses = enrollments.map(enroll => enroll.courseId);

    res.json(courses);
  } catch (err) {
    console.error("Error fetching enrolled courses:", err);
    res.status(500).json({ message: "Error fetching enrolled courses" });
  }
});

export default router;
