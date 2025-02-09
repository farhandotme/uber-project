const express = require("express");
const { body } = require("express-validator");
const router = express.Router();
const { registerCaptain } = require("../controllers/captainController");

router.post(
  "/register",
  [
    body("email").isEmail().withMessage("Please enter email"),
    body("password")
      .isLength({ min: 6 })
      .withMessage("Password must be at least 6 characters long"),
    body("fullname.firstname")
      .isLength({ min: 3 })
      .withMessage("Full name must be at least 3 characters long"),
    body("vehicle.color")
      .isLength({ min: 3 })
      .withMessage("Vehicle color must be at least 3 characters long"),
    body("vehicle.plate")
      .isLength({ min: 3 })
      .withMessage("Vehicle plate must be at least 3 characters long"),
    body("vehicle.model")
      .isLength({ min: 3 })
      .withMessage("Vehicle model must be at least 3 characters long"),
  ],
  registerCaptain
);

module.exports = router;
