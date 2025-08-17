const Prompt = require("../models/prompt.model");
const generateTag = require("../services/ai.service");
const { exportToJSON, exportToPDFBuffer } = require("../utils/export.utils");

/** Create prompt (auto tags optional) */
module.exports.createPrompt = async (req, res) => {
  try {
    const {
      title,
      content,
      category,
      tags = [],
      visibility = "personal",
      tagMode,
    } = req.body;
    if (!title || !content || !category)
      return res.status(400).json({ message: "Missing fields" });

    let finalTags = tags;
    if (tagMode == "ai") {
      const aiTags = await generateTag(content);
      finalTags = Array.from(new Set([...tags, ...aiTags]));
    }
    if (tagMode == "manual") {
      finalTags = Array.from(new Set([...tags]));
    }

    const prompt = await Prompt.create({
      title,
      content,
      category,
      tags: finalTags,
      tagMode,
      visibility,
      author: req.user._id,
    });

    return res
      .status(201)
      .json({ message: "Prompt Added successfully", prompt });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server error" });
  }
};

/** Update prompt */
module.exports.updatePrompt = async (req, res) => {
  try {
    const id = req.params.id;
    const updates = req.body;
    const prompt = await Prompt.findByIdAndUpdate(id, updates, { new: true });
    if (!prompt) return res.status(404).json({ message: "Not found" });
    res.json(prompt);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

/** Delete prompt */
module.exports.deletePrompt = async (req, res) => {
  try {
    const id = req.params.id;
    await Prompt.findByIdAndDelete(id);
    res.json({ message: "Deleted" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server error" });
  }
};

/** Get prompts for user's personal vault */
module.exports.getPersonalPrompts = async (req, res) => {
  try {
    const author = req.user._id;
    if (!author) return res.status(400).json({ message: "author required" });
    const prompts = await Prompt.find({ author }).populate(
      "author",
      "name email"
    );
    res.json(prompts);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

/** Community: list public prompts, with filters */
module.exports.getCommunityPrompts = async (req, res) => {
  try {
    const { tag, q, sort = "new", page = 1, limit = 20 } = req.query;
    const filter = { visibility: "community" };
    if (tag) filter.tags = tag;
    if (q) filter.$text = { $search: q }; // requires text index if you'd like full text
    const sortMap = { new: { createdAt: -1 }, popular: { upvotes: -1 } };
    const prompts = await Prompt.find(filter)
      .sort(sortMap[sort] || { createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(Number(limit));
    res.json(prompts);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

/** Upvote / downvote */
module.exports.votePrompt = async (req, res) => {
  try {
    const id = req.params.id;
    const { vote } = req.body; // 'up' or 'down'
    if (!["up", "down"].includes(vote))
      return res.status(400).json({ message: "Invalid vote" });
    const inc = vote === "up" ? { upvotes: 1 } : { downvotes: 1 };
    const prompt = await Prompt.findByIdAndUpdate(
      id,
      { $inc: inc },
      { new: true }
    );
    res.json(prompt);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

/** Export prompts */
module.exports.exportPrompts = async (req, res) => {
  try {
    const { format } = req.body;
    if (!format) {
      return res.status(400).json({ message: "Format is required" });
    }
    const author = req.user._id;

    const prompts = await Prompt.find({ author }).sort({ createdAt: -1 });

    if (format === "json") {
      const payload = exportToJSON(prompts);
      res.setHeader("Content-disposition", "attachment; filename=prompts.json");
      return res.json(payload);
    } else if (format === "pdf") {
      const buffer = await exportToPDFBuffer(prompts);
      res.setHeader("Content-type", "application/pdf");
      res.setHeader("Content-disposition", "attachment; filename=prompts.pdf");
      return res.send(buffer);
    } else {
      return res.status(400).json({ message: "Unsupported format" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

// backend/controllers/promptController.js
module.exports.exportSinglePrompt = async (req, res) => {
  try {
    const { id, format } = req.body;
    const author = req.user._id;

    if (!id || !format) {
      return res.status(400).json({ message: "id and format required" });
    }

    const prompt = await Prompt.findOne({ _id: id, author });
    if (!prompt) {
      return res.status(404).json({ message: "Prompt not found" });
    }

    let data;
    if (format === "json") {
      data = JSON.stringify(exportToJSON([prompt]), null, 2);
      res.setHeader("Content-Disposition", "attachment; filename=prompt.json");
      res.setHeader("Content-Type", "application/json");
    } else if (format === "pdf") {
      // yahan tum PDF export ka code likh chuki ho backend me
      const buffer = await exportToPDFBuffer([prompt]); // wrap in array for compatibility
      res.setHeader("Content-Type", "application/pdf");
      res.setHeader("Content-Disposition", "attachment; filename=prompt.pdf");
      return res.send(buffer);
    }
   return res.send(data);
  } catch (error) {
   return res.status(500).json({ message: error.message });
  }
};
