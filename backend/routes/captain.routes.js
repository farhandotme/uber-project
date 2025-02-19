const express = require("express");
const router = express.Router();
const {
  registerCaptain,
  loginCaptain,
  getCaptainProfile,
  logoutCaptain,
} = require("../controllers/captain.controller");
const authenticateCaptain = require("../middlewares/authCaptain");

router.post("/register", registerCaptain);
router.post("/login", loginCaptain);
router.get('/profile', authenticateCaptain, getCaptainProfile);

module.exports = router;
