const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    username: { type: String, unique: true, required: true },
    password: { type: String, required: true }, // Will be hashed
    balance: { type: Number, default: 1000 }, // Default balance
});

module.exports = mongoose.model("User", UserSchema);
