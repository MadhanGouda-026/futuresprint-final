require('dns').setServers(['8.8.8.8', '8.8.4.4']);
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({ origin: "*" }));
app.use(express.json({ limit: "10mb" }));

app.use("/api/auth", require("./routes/auth"));
app.use("/api/internships", require("./routes/internships"));
app.use("/api/applications", require("./routes/applications"));
app.use("/api/certificates", require("./routes/certificates"));
app.use("/api/admin", require("./routes/admin"));
app.get("/api/health", (req, res) => res.json({ status: "OK", message: "FutureSprint API 🚀" }));

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log("✅ MongoDB Connected");
    app.listen(PORT, () => console.log(`🚀 FutureSprint API: http://localhost:${PORT}`));
  })
  .catch(err => console.error("❌ MongoDB Error:", err.message));
