const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Register (Create User)
exports.registerUser = async (req, res) => {
  try {
    const { matricNumber, fullName, password } = req.body;

    if (!matricNumber || !fullName || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const exists = await User.findOne({ matricNumber });
    if (exists) {
      return res.status(400).json({ message: "Matric number already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      matricNumber,
      fullName,
      password: hashedPassword,
    });

    res.status(201).json({
      success: true,
      message: "User registered successfully",
      data: {
        id: user._id,
        matricNumber: user.matricNumber,
        fullName: user.fullName,
      }
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Login User
exports.loginUser = async (req, res) => {
  try {
    const { matricNumber, password } = req.body;

    const user = await User.findOne({ matricNumber });
    if (!user) {
      return res.status(400).json({ message: "Invalid matricNumber or password" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid matricNumber or password" });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    res.json({
      success: true,
      message: "Login successful",
      token,
      user: {
        id: user._id,
        matricNumber: user.matricNumber,
        fullName: user.fullName,
      }
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
