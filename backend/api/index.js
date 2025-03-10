require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const authRoutes = require("../routes/auth");
const atmRoutes = require("../routes/atm");

const app = express();
app.use(cors());
app.use(express.json());

// ✅ Ensure MongoDB connects only once (fixes timeout issue)
let isConnected = false; // Track MongoDB connection status

async function connectDB() {
    if (isConnected) {
        console.log("✅ Using existing MongoDB connection");
        return;
    }
    try {
        await mongoose.connect(process.env.MONGO_URI);
        isConnected = true;
        console.log("✅ Connected to MongoDB");
    } catch (err) {
        console.error("❌ MongoDB Connection Error:", err);
    }
}

// Connect to DB before server starts
connectDB();

// 🔹 API Route to check if backend is working
app.get("/", (req, res) => {
    res.json({ message: "✅ API is working on Render!" });
});

// Attach routes
app.use("/api/auth", authRoutes);
app.use("/api/atm", atmRoutes);

// ✅ Start the Express server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
});
