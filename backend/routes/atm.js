const express = require("express");
const User = require("../models/User");
const Transaction = require("../models/Transaction");
const authMiddleware = require("../middleware/authMiddleware");
const router = express.Router();

let pendingTransactions = {};  // Store pending transactions per ATM

// 🔹 Get pending transactions for an ATM
router.get("/pending/:atmId", async (req, res) => {
    const { atmId } = req.params;

    if (!pendingTransactions[atmId] || pendingTransactions[atmId].length === 0) {
        return res.json({ transactions: [] });  // No pending transactions
    }

    // Return and clear pending transactions
    const transactions = [...pendingTransactions[atmId]];
    pendingTransactions[atmId] = [];
    res.json({ transactions });
});

// 🔹 Withdraw Money
router.post("/withdraw", authMiddleware, async (req, res) => {
    const { atmId, customerNumber, amount } = req.body;

    if (!atmId || !customerNumber || !amount || amount <= 0) {
        return res.status(400).json({ error: "ATM ID, customer number, and valid amount required." });
    }

    try {
        const user = await User.findOne({ customerNumber });
        if (!user) return res.status(404).json({ error: "User not found" });

        if (user.balance < amount) return res.status(400).json({ error: "Insufficient funds" });

        user.balance -= amount;
        await user.save();

        await Transaction.create({ userId: user._id, type: "withdraw", amount });

        // Store transaction in pending queue
        if (!pendingTransactions[atmId]) pendingTransactions[atmId] = [];
        pendingTransactions[atmId].push({ action: "withdraw", amount });

        res.json({ message: "Withdrawal scheduled", newBalance: user.balance });
    } catch (err) {
        console.error("❌ Error in withdrawal:", err);
        res.status(500).json({ error: "Server error" });
    }
});

// 🔹 Deposit Money
router.post("/deposit", authMiddleware, async (req, res) => {
    const { atmId, customerNumber, amount } = req.body;

    if (!atmId || !customerNumber || !amount || amount <= 0) {
        return res.status(400).json({ error: "ATM ID, customer number, and valid amount required." });
    }

    try {
        const user = await User.findOne({ customerNumber });
        if (!user) return res.status(404).json({ error: "User not found" });

        user.balance += amount;
        await user.save();

        await Transaction.create({ userId: user._id, type: "deposit", amount });

        // Store transaction in pending queue
        if (!pendingTransactions[atmId]) pendingTransactions[atmId] = [];
        pendingTransactions[atmId].push({ action: "deposit", amount });

        res.json({ message: "Deposit scheduled", newBalance: user.balance });
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
