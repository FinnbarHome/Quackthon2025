const express = require("express");
const User = require("../models/User");
const Transaction = require("../models/Transaction");
const authMiddleware = require("../middleware/authMiddleware");
const router = express.Router();

// Helper function to validate transactions
const validateTransaction = (customerNumber, amount) => {
    if (!customerNumber || typeof amount !== "number" || amount <= 0) {
        return { error: "Invalid input. Customer number and positive amount required." };
    }
    return null;
};

// Withdraw Money
router.post("/withdraw", authMiddleware, async (req, res) => {
    const { customerNumber, amount } = req.body;

    const validationError = validateTransaction(customerNumber, amount);
    if (validationError) return res.status(400).json(validationError);

    try {
        const user = await User.findOne({ customerNumber });
        if (!user) return res.status(404).json({ error: "User not found" });

        if (user.balance < amount) return res.status(400).json({ error: "Insufficient funds" });

        // Deduct from balance
        user.balance -= amount;
        await user.save();

        // Log transaction
        await Transaction.create({ userId: user._id, type: "withdraw", amount });

        res.json({ message: "Withdrawal successful", newBalance: user.balance });
    } catch (err) {
        console.error("❌ Error in withdrawal:", err);
        res.status(500).json({ error: "Server error" });
    }
});

// Deposit Money
router.post("/deposit", authMiddleware, async (req, res) => {
    const { customerNumber, amount } = req.body;

    const validationError = validateTransaction(customerNumber, amount);
    if (validationError) return res.status(400).json(validationError);

    try {
        const user = await User.findOne({ customerNumber });
        if (!user) return res.status(404).json({ error: "User not found" });

        // Add deposit to balance
        user.balance += amount;
        await user.save();

        // Log transaction
        await Transaction.create({ userId: user._id, type: "deposit", amount });

        res.json({ message: "Deposit successful", newBalance: user.balance });
    } catch (err) {
        console.error("❌ Error in deposit:", err);
        res.status(500).json({ error: "Server error" });
    }
});

// Get Account Balance
router.get("/balance/:customerNumber", authMiddleware, async (req, res) => {
    try {
        const user = await User.findOne({ customerNumber: req.params.customerNumber });
        if (!user) return res.status(404).json({ error: "User not found" });

        res.json({ balance: user.balance });
    } catch (err) {
        console.error("❌ Error fetching balance:", err);
        res.status(500).json({ error: "Server error" });
    }
});

// Get Transaction History
router.get("/transactions/:customerNumber", authMiddleware, async (req, res) => {
    try {
        const user = await User.findOne({ customerNumber: req.params.customerNumber });
        if (!user) return res.status(404).json({ error: "User not found" });

        const transactions = await Transaction.find({ userId: user._id }).sort({ timestamp: -1 });
        res.json(transactions);
    } catch (err) {
        console.error("❌ Error fetching transactions:", err);
        res.status(500).json({ error: "Server error" });
    }
});

module.exports = router;
