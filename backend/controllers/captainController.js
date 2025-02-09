const captainModel = require("../models/captain.model");

const registerCaptain = async (req, res) => {
  try {
    const { firstname, lastname, email, password, color, plate, model } =
      req.body;

    if (!firstname || !email || !password || !color || !plate || !model) {
      return res.status(400).json({ message: "Please fill all fields" });
    }

    const userExists = await captainModel.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: "User already exists" });
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

module.exports = { registerCaptain };
