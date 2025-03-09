const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const router = express.Router();

// **User Registration**
router.post("/register", async (req, res) => {
  const { customerNumber, password } = req.body;

  // Validate input
  if (
    !customerNumber ||
    typeof customerNumber !== "string" ||
    customerNumber.trim() === ""
  ) {
    return res.status(400).json({ error: "Customer number is required." });
  }
  if (!password || password.length < 6) {
    return res
      .status(400)
      .json({ error: "Password must be at least 6 characters long." });
  }

  try {
    // Check if the customer number already exists
    const existingUser = await User.findOne({ customerNumber });
    if (existingUser) {
      return res.status(400).json({ error: "Customer number already exists." });
    }

    // Hash the password before storing
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create and save the new user
    const newUser = new User({ customerNumber, password: hashedPassword });
    await newUser.save();

    res.status(201).json({
      message: "User registered successfully",
      customerNumber: newUser.customerNumber,
    });
  } catch (err) {
    console.error("❌ Error in registration:", err);
    res.status(500).json({ error: "Server error" });
  }
});

// **User Login**
router.post("/login", async (req, res) => {
  const { customerNumber, password } = req.body;

  // Validate input
  if (!customerNumber || !password) {
    return res
      .status(400)
      .json({ error: "Customer number and password are required." });
  }

  try {
    // Find the user by customer number
    const user = await User.findOne({ customerNumber });
    if (!user) {
      return res
        .status(400)
        .json({ error: "Invalid customer number or password" });
    }

    // Compare the provided password with the stored hashed password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res
        .status(400)
        .json({ error: "Invalid customer number or password" });
    }

    // Generate a JWT token for authentication
    const token = jwt.sign(
      { userId: user._id, customerNumber: user.customerNumber },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.json({
      token,
      customerNumber: user.customerNumber,
      balance: user.balance,
    });
  } catch (err) {
    console.error("❌ Server error:", err);
    res.status(500).json({ error: "Server error" });
  }
});

// **Verify JWT Token (Token Validation Route)**
router.get("/verify-token", async (req, res) => {
  const token = req.header("Authorization")?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ error: "No token provided." });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    res.json({ valid: true, user: decoded });
  } catch (err) {
    return res.status(401).json({ error: "Invalid or expired token." });
  }
});

module.exports = router;
