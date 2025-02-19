const jwt = require('jsonwebtoken');
const captainModel = require('../models/captain.model');

const authenticateCaptain = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    if (!token) {
      return res.status(401).json({ message: 'Authentication token is missing' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const captain = await captainModel.findById(decoded.id);
    if (!captain) {
      return res.status(401).json({ message: 'Captain not found' });
    }

    req.captain = captain;
    next();
  } catch (error) {
    console.error(error);
    return res.status(401).json({ message: 'Authentication failed' });
  }
};

module.exports = authenticateCaptain;