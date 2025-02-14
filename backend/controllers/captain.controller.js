const captainModel = require("../models/captain.model");

// logic for register captain

const registerCaptain = async (req, res) => {
  try {
    const { firstname, lastname, email, password, color, plate, model } =
      req.body;

    if (!firstname || !email || !password || !color || !plate || !model) {
      return res.status(400).json({ message: "Please fill all fields" });
    }

    const captainExists = await captainModel.findOne({ email });
    if (captainExists) {
      return res.status(400).json({ message: "captain already exists" });
    }

    const captain = await captainModel.create({
      fullname: { firstname, lastname },
      email,
      password,
      vehicle: { color, plate, model },
    });
    const token = captain.generateJWT();
    res.cookie("token", token);

    return res
      .status(201)
      .json({ message: "Captain registered successfully", captain, token });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

// logic for login captain

const loginCaptain = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: "Please fill all fields" });
    }
    const captain = await captainModel.findOne({ email }).select("+password");
    if (!captain) {
      return res.status(401).json({ message: "captain doses not exist" });
    }
    const isMatch = await captain.correctPassword(password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid password" });
    }
    const token = captain.generateJWT();
    res.cookie("token", token);
    return res
      .status(200)
      .json({ message: "Login successful", captain, token });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

// logic for get profile details of captain

const getCaptainProfile = async (req, res) => {
  return res.status(200).json(req.captain);
};

// logic for logout captain

const logoutCaptain = async (req, res) => {
  res.clearCookie("token");
  return res.status(200).json({ message: "Logout successful" });
};

// exporting all functions
module.exports = {
  registerCaptain,
  loginCaptain,
  getCaptainProfile,
  logoutCaptain,
};
