import express from "express";
import { enrollCourse, getMyCourses } from "../controllers/enrollmentController.js";

const router = express.Router();

router.post("/:studentId/:courseId", enrollCourse);
router.get("/:studentId", getMyCourses);

export default router;
