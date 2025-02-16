const express = require("express");
const router = express.Router();
const {
  registerCaptain,
  loginCaptain,
  getCaptainProfile,
  logoutCaptain,
} = require("../controllers/captain.controller");
const { authMiddleware } = require("../middlewares/authMiddleware");

router.post("/register", registerCaptain);
router.post("/login", loginCaptain);
router.get("/profile", authMiddleware, getCaptainProfile);

module.exports = router;
