require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const { VercelRequest, VercelResponse } = require("@vercel/node"); // Required for Vercel

const authRoutes = require("../routes/auth");
const atmRoutes = require("../routes/atm");

const app = express();
app.use(cors());
app.use(express.json());

// Connect to MongoDB (Avoid multiple connections in Serverless)
let isConnected = false;
async function connectDB() {
    if (!isConnected) {
        await mongoose.connect(process.env.MONGO_URI);
        isConnected = true;
        console.log("✅ Connected to MongoDB");
    }
}

// Define routes
app.use("/api/auth", authRoutes);
app.use("/api/atm", atmRoutes);

// Vercel requires a function export
module.exports = async (req, res) => {
    await connectDB(); // Ensure DB is connected
    return app(req, res); // Pass request to Express app
};
