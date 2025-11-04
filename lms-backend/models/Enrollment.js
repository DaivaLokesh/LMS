import mongoose from "mongoose";

const enrollmentSchema = new mongoose.Schema({
  studentId: { type: mongoose.Schema.Types.ObjectId, ref: "Student" },
  courseId: { type: mongoose.Schema.Types.ObjectId, ref: "Course" },
  date: { type: Date, default: Date.now },
});

export default mongoose.model("Enrollment", enrollmentSchema);
