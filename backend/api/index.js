require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const authRoutes = require("../routes/auth");
const atmRoutes = require("../routes/atm");

const app = express();
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("✅ Connected to MongoDB"))
    .catch(err => console.log(err));

app.use("/api/auth", authRoutes);
app.use("/api/atm", atmRoutes);

module.exports = app; // No app.listen() needed
