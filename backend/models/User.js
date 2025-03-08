const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    customerNumber: { type: String, unique: true, required: true }, // Unique Customer Number
    password: { type: String, required: true }, // Hashed Password
    balance: { type: Number, default: 1000 } // Default Balance
});

// Ensure customerNumber is generated before saving
UserSchema.pre("validate", async function (next) {
    if (!this.customerNumber) {
        let uniqueNumber;
        do {
            uniqueNumber = Math.floor(1000000000 + Math.random() * 9000000000).toString();
        } while (await mongoose.model("User").exists({ customerNumber: uniqueNumber }));
        this.customerNumber = uniqueNumber;
    }
    next();
});

module.exports = mongoose.model("User", UserSchema);
