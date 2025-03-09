require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const authRoutes = require("../routes/auth");
const atmRoutes = require("../routes/atm");

const app = express();
app.use(cors());
app.use(express.json());

// MongoDB Connection (Prevent multiple reconnections in serverless)
let isConnected = false;
async function connectDB() {
    if (!isConnected) {
        await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        isConnected = true;
        console.log("✅ Connected to MongoDB");
    }
}

// Attach routes
app.use("/api/auth", authRoutes);
app.use("/api/atm", atmRoutes);

// Default route for testing
app.get("/api", (req, res) => {
    res.json({ message: "API is working on Vercel!" });
});

// Export handler for Vercel
const serverless = require("serverless-http"); // Import serverless-http
module.exports = serverless(app);
