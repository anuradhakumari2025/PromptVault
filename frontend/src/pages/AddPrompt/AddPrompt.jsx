import "./AddPrompt.css"
import { useState } from "react";

export default function AddPrompt() {
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    category: "",
    tags: [],
    tagMode: "manual",
    visibility: "personal",
  });

  const [tagInput, setTagInput] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const addTag = () => {
    if (tagInput.trim() !== "") {
      setFormData({ ...formData, tags: [...formData.tags, tagInput.trim()] });
      setTagInput("");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
  };

  return (
    <div className="add-prompt-container">
      <form className="add-prompt-form" onSubmit={handleSubmit}>
        <h2>Add New Prompt</h2>

        {/* Title */}
        <label>Title</label>
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          placeholder="Enter prompt title"
          required
        />

        {/* Content */}
        <label>Content</label>
        <textarea
          name="content"
          value={formData.content}
          onChange={handleChange}
          placeholder="Write your prompt..."
          rows={5}
          required
        />

        {/* Category */}
        <label>Category</label>
        <input
          type="text"
          name="category"
          value={formData.category}
          onChange={handleChange}
          placeholder="e.g. Coding, Marketing, Education"
          required
        />

        {/* Tag Mode */}
        <label>Tag Mode</label>
        <select
          name="tagMode"
          value={formData.tagMode}
          onChange={handleChange}
        >
          <option value="manual">Manual</option>
          <option value="ai">AI Generated</option>
        </select>

        {/* Tags (only show if manual mode) */}
        {formData.tagMode === "manual" && (
          <>
            <label>Tags</label>
            <div className="tag-input-box">
              <input
                type="text"
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                placeholder="Add a tag"
              />
              <button type="button" onClick={addTag}>
                Add
              </button>
            </div>
            <div className="tag-list">
              {formData.tags.map((tag, i) => (
                <span key={i} className="tag">
                  {tag}
                </span>
              ))}
            </div>
          </>
        )}

        {/* Visibility */}
        <label>Visibility</label>
        <select
          name="visibility"
          value={formData.visibility}
          onChange={handleChange}
        >
          <option value="personal">Personal</option>
          <option value="community">Community</option>
        </select>

        {/* Submit */}
        <button type="submit" className="submit-btn">
          Submit Prompt
        </button>
      </form>
    </div>
  );
}

