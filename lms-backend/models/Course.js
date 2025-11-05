import mongoose from "mongoose";

const courseSchema = new mongoose.Schema({
  name: { type: String, required: true },
  code: { type: String, required: true },
  ccode: { type: String },
  description: { type: String }
});

export default mongoose.model("Course", courseSchema);
