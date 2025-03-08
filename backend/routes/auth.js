const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const router = express.Router();

// User Login Route
router.post("/login", async (req, res) => {
    const { customerNumber, password } = req.body;

    try {
        const user = await User.findOne({ customerNumber });
        if (!user) {
            console.log("❌ Customer not found:", customerNumber);
            return res.status(400).json({ error: "Invalid customer number or password" });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            console.log("❌ Incorrect password for:", customerNumber);
            return res.status(400).json({ error: "Invalid customer number or password" });
        }

        const token = jwt.sign({ userId: user._id, customerNumber: user.customerNumber }, process.env.JWT_SECRET, { expiresIn: "1h" });

        console.log(`✅ Login successful: ${customerNumber}`);
        res.json({ token, customerNumber: user.customerNumber, balance: user.balance });

    } catch (err) {
        console.error("❌ Server error:", err);
        res.status(500).json({ error: "Server error" });
    }
});

// Register New User
router.post("/register", async (req, res) => {
    const { password } = req.body;

    try {
        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({ password: hashedPassword });
        await newUser.save();

        res.status(201).json({ message: "User registered successfully", customerNumber: newUser.customerNumber });
    } catch (err) {
        console.error("❌ Error in registration:", err);
        res.status(500).json({ error: "Server error" });
    }
});

module.exports = router;
