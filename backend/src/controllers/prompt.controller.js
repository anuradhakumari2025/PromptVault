const Prompt = require("../models/prompt.model");
const generateTag = require("../services/ai.service");
const { exportToJSON, exportToPDFBuffer } = require("../utils/export.utils");

/** Create prompt (auto tags optional) */
module.exports.createPrompt = async (req, res) => {
  try {
    const {
      title,
      content,
      tags = [],
      visibility = "personal",
      author,
      useAiTagging,
    } = req.body;
    if (!title || !content || !author)
      return res.status(400).json({ message: "Missing fields" });

    let finalTags = tags;
    if (useAiTagging) {
      const aiTags = await generateTag(content);
      finalTags = Array.from(new Set([...tags, ...aiTags])).slice(0, 10);
    }

    const prompt = await Prompt.create({
      title,
      content,
      tags: finalTags,
      visibility,
      author,
    });
    // await prompt.save();

    res.status(201).json(prompt);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
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
    console.log(err)
    res.status(500).json({ message: "Server error" });
  }
};

/** Get prompts for user's personal vault */
module.exports.getPersonalPrompts = async (req, res) => {
  try {
    const author = req.query.author;
    if (!author) return res.status(400).json({ message: "author required" });
    const prompts = await Prompt.find({ author }).populate("author", "name email");
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
    const { author, format = "json" } = req.body;
    if (!author) return res.status(400).json({ message: "author required" });

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
