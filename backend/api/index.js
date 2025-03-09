require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const serverless = require("serverless-http");

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
        await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        isConnected = true;
        console.log("✅ Connected to MongoDB");
    } catch (err) {
        console.error("❌ MongoDB Connection Error:", err);
    }
}

// 🔹 API Route to check if backend is working
app.get("/api", async (req, res) => {
    res.json({ message: "✅ API is working on Vercel!" });
});

// Attach routes
app.use("/api/auth", authRoutes);
app.use("/api/atm", atmRoutes);

// ✅ Ensure DB connection before handling requests
module.exports = async (req, res) => {
    await connectDB();
    return serverless(app)(req, res); // Wrap Express app with serverless-http
};
