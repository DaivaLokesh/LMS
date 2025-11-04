import mongoose from "mongoose";

const courseSchema = new mongoose.Schema({
  name: String,
  code: String,
  description: String,
});

export default mongoose.model("Course", courseSchema);
