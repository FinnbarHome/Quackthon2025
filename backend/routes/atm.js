const express = require("express");
const User = require("../models/User");
const Transaction = require("../models/Transaction");
const router = express.Router();

// Withdraw money
router.post("/withdraw", async (req, res) => {
    const { userId, amount } = req.body;

    try {
        const user = await User.findById(userId);
        if (!user) return res.status(404).json({ error: "User not found" });

        if (user.balance < amount) return res.status(400).json({ error: "Insufficient funds" });

        // Deduct from balance & log transaction
        user.balance -= amount;
        await user.save();

        const transaction = new Transaction({ userId, type: "withdraw", amount });
        await transaction.save();

        res.json({ message: "Withdrawal successful", newBalance: user.balance });
    } catch (err) {
        res.status(500).json({ error: "Server error" });
    }
});

// Get account balance
router.get("/balance/:userId", async (req, res) => {
    try {
        const user = await User.findById(req.params.userId);
        if (!user) return res.status(404).json({ error: "User not found" });

        res.json({ balance: user.balance });
    } catch (err) {
        res.status(500).json({ error: "Server error" });
    }
});

module.exports = router;
