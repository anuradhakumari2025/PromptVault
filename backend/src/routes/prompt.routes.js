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
const { authUser } = require("../middlewares/auth.middleware");
const router = express.Router();

// public community listing
router.get("/community",authUser, getCommunityPrompts);

// personal prompts (authorId via query for now)
router.get("/personal",authUser, getPersonalPrompts);

// create / read / update / delete
router.post("/create",authUser, createPrompt);
router.put("/update/:id",authUser, updatePrompt);
router.delete("/delete/:id",authUser, deletePrompt);

// vote
router.post("/:id/vote",authUser, votePrompt);

// export
router.post("/export",authUser, exportPrompts);

module.exports = router;
