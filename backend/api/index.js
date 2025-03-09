const express = require("express");
const serverless = require("serverless-http");

const app = express();

app.get("/api", (req, res) => {
    res.json({ message: "✅ API is working without MongoDB!" });
});

module.exports = serverless(app);
