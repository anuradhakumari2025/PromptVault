const express = require("express");
const {
  registerHandler,
  loginHandler,
  logoutUser,
} = require("../controllers/auth.controller");
const router = express.Router();

router.post("/register", registerHandler);
router.post("/login",loginHandler);
router.get("/logout",logoutUser)

module.exports = router;
