const mongoose = require("mongoose");

const TransactionSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    type: { type: String, enum: ["withdraw", "deposit"], required: true },
    amount: { type: Number, required: true, min: 1 }, // Ensure positive values
    timestamp: { type: Date, default: Date.now }
});

TransactionSchema.index({ userId: 1, timestamp: -1 });

module.exports = mongoose.model("Transaction", TransactionSchema);
