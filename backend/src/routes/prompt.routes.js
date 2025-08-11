const express = require("express");
const {
  exportPrompts,
  votePrompt,
  getCommunityPrompts,
  getPersonalPrompts,
  deletePrompt,
  updatePrompt,
  createPrompt,
} = require("../controllers/prompt.controller");
const router = express.Router();

// public community listing
router.get("/community", getCommunityPrompts);

// personal prompts (authorId via query for now)
router.get("/personal", getPersonalPrompts);

// create / read / update / delete
router.post("/create", createPrompt);
router.put("/update/:id", updatePrompt);
router.delete("/delete/:id", deletePrompt);

// vote
router.post("/:id/vote", votePrompt);

// export
router.post("/export", exportPrompts);

module.exports = router;
