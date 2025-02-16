const express = require("express");
const router = express.Router();
const { body } = require("express-validator");
const {
  registerUser,
  loginUser,
  getUserProfile,
  logoutUser,
} = require("../controllers/user.controller");

const { authMiddleware } = require("../middlewares/authMiddleware");

router.post(
  "/register",
  [
    body("email").isEmail().withMessage("Please enter email"),
    // body("fullname.firstname")
    //   .isLength({ min: 3 })
    //   .withMessage("first name must be at least 3 characters long"),
    body("password")
      .isLength({ min: 6 })
      .withMessage("Password must be at least 6 characters long"),
  ],
  registerUser
);

router.post(
  "/login",
  [body("email").isEmail().withMessage("Please enter email")],
  loginUser
);

router.get("/profile", authMiddleware, getUserProfile);


module.exports = router;
