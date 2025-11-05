// server.js
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import bcrypt from "bcryptjs";

// ✅ Load environment variables
dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

// ✅ MongoDB connection
mongoose
  .connect(process.env.MONGO_URI || "mongodb://127.0.0.1:27017/lms", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => console.log("❌ Database connection error:", err));

// -------------------------------------------------------------
// 🧠 SCHEMAS & MODELS
// -------------------------------------------------------------

const studentSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
});

const courseSchema = new mongoose.Schema({
  name: String,
  code: String,
  description: String,
});

const enrollmentSchema = new mongoose.Schema({
  studentId: { type: mongoose.Schema.Types.ObjectId, ref: "Student" },
  courseId: { type: mongoose.Schema.Types.ObjectId, ref: "Course" },
  date: { type: Date, default: Date.now },
});

const Student = mongoose.model("Student", studentSchema);
const Course = mongoose.model("Course", courseSchema);
const Enrollment = mongoose.model("Enrollment", enrollmentSchema);

// -------------------------------------------------------------
// 🧩 ROUTES
// -------------------------------------------------------------

// ✅ Register student
app.post("/api/register", async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const existing = await Student.findOne({ email });
    if (existing)
      return res.status(400).json({ message: "Email already registered" });

    const hashed = await bcrypt.hash(password, 10);
    const student = new Student({ name, email, password: hashed });
    await student.save();

    console.log("✅ Registered student:", student);

    res.status(201).json({ message: "Student registered successfully!" });
  } catch (err) {
    console.error("❌ Error registering:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// ✅ Login student
app.post("/api/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const student = await Student.findOne({ email });
    if (!student)
      return res.status(404).json({ message: "Student not found" });

    const isMatch = await bcrypt.compare(password, student.password);
    if (!isMatch)
      return res.status(401).json({ message: "Invalid credentials" });

    res.json({
      message: "Login successful",
      studentId: student._id,
      name: student.name,
    });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

// ✅ Get all courses
app.get("/api/courses", async (req, res) => {
  try {
    const courses = await Course.find();
    res.json(courses);
  } catch (err) {
    res.status(500).json({ message: "Error fetching courses" });
  }
});

// ✅ Get course by ID
app.get("/api/courses/:id", async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);
    if (!course)
      return res.status(404).json({ message: "Course not found" });
    res.json(course);
  } catch (err) {
    res.status(500).json({ message: "Error fetching course details" });
  }
});

// ✅ Enroll in a course
app.post("/api/students/:studentId/enroll/:courseId", async (req, res) => {
  const { studentId, courseId } = req.params;

  try {
    const student = await Student.findById(studentId);
    const course = await Course.findById(courseId);
    if (!student || !course)
      return res.status(404).json({ message: "Student or Course not found" });

    const existing = await Enrollment.findOne({ studentId, courseId });
    if (existing)
      return res.status(400).json({ message: "Already enrolled in this course" });

    const enrollment = new Enrollment({ studentId, courseId });
    await enrollment.save();

    res.json({ message: "Enrolled successfully!" });
  } catch (err) {
    console.error("Enrollment Error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

app.post("/courses/:id/resources", async (req, res) => {
  const { title, type, url } = req.body;
  const { id } = req.params;

  if (!title || !url) return res.status(400).json({ message: "Title and URL are required" });

  try {
    const course = await Course.findById(id);
    if (!course) return res.status(404).json({ message: "Course not found" });

    course.resources.push({ title, type, url });
    await course.save();

    res.json({ message: "Resource added successfully!", course });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

app.get("/api/enrollments/:studentId", async (req, res) => {
  try {
    const { studentId } = req.params;
    console.log("Fetching enrollments for student:", studentId);

    const enrolled = await Enrollment.find({ studentId }).populate("courseId");
    console.log("Found enrollments:", enrolled);

    if (!enrolled || enrolled.length === 0) {
      return res.status(200).json([]); // No courses found
    }

    const courses = enrolled.map((e) => ({
      _id: e.courseId?._id,
      name: e.courseId?.name,
      code: e.courseId?.code,
      ccode: e.courseId?.ccode,
      description: e.courseId?.description,
    }));

    res.json(courses);
  } catch (err) {
    console.error("Enrollment fetch error:", err);
    res.status(500).json({ message: "Error fetching enrolled courses" });
  }
});


// -------------------------------------------------------------
// 🚀 START SERVER
// -------------------------------------------------------------

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
