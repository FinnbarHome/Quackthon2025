const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    customerNumber: { type: String, unique: true, required: true }, // Unique Customer Number
    password: { type: String, required: true }, // Hashed Password
    balance: { type: Number, default: 1000 } // Default Balance
});

module.exports = mongoose.model("User", UserSchema);
