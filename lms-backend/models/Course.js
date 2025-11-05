import mongoose from "mongoose";

const courseSchema = new mongoose.Schema({
  name: { type: String, required: true },
  code: { type: String, required: true },
  ccode: { type: String },
  description: { type: String },
  resources: [
    {
      title: { type: String, required: true },
      type: { type: String, enum: ["pdf", "video", "link"], default: "pdf" },
      url: { type: String, required: true }
    }
  ]
});

export default mongoose.model("Course", courseSchema);
