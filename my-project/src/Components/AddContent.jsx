import React, { useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import "../css/AddContent.css";

const AddContent = () => {
  const { id: courseId } = useParams(); // Get courseId from the URL
  const [title, setTitle] = useState("");
  const [type, setType] = useState("pdf");
  const [url, setUrl] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!courseId) {
      setMessage("Course ID not found!");
      return;
    }

    try {
      const res = await axios.post(`http://localhost:5000/api/courses/${courseId}/resources`, {
        title,
        type,
        url
      });
      setMessage(res.data.message);
      setTitle("");
      setUrl("");
    } catch (err) {
      setMessage(err.response?.data?.message || "Error adding resource");
    }
  };

  return (
    <div className="add-content-container">
      <h2>Add Resource</h2>
      <form className="add-content-form" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Resource Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <select value={type} onChange={(e) => setType(e.target.value)}>
          <option value="pdf">PDF</option>
          <option value="video">Video</option>
          <option value="link">Link</option>
        </select>
        <input
          type="text"
          placeholder="Resource URL"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          required
        />
        <button type="submit">Add Resource</button>
      </form>
      {message && <p className="message">{message}</p>}
    </div>
  );
};

export default AddContent;
