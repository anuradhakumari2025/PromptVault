const mongoose = require("mongoose");

const promptSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  category: { type: String, required: true }, // ✅ New field
  tags: [{ type: String }],

  tagMode: {
    type: String,
    enum: ["manual", "ai"],
    default: "manual", // ✅ Whether tags are manual or AI generated
  },
  visibility: {
    type: String,
    enum: ["personal", "community"],
    default: "personal",
  },
  author: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, // Ref to User model
  upvotes: { type: Number, default: 0 },
  downvotes: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now },
});

const Prompt = mongoose.model("Prompt", promptSchema);
module.exports = Prompt;
