const mongoose = require("mongoose");
const internshipSchema = new mongoose.Schema({
  title: { type: String, required: true },
  domain: { type: String, required: true },
  description: String, duration: String,
  skills: [String], mode: { type: String, default: "remote" },
  seats: { type: Number, default: 50 },
  isActive: { type: Boolean, default: true },
  image: String, color: String,
}, { timestamps: true });
module.exports = mongoose.model("Internship", internshipSchema);
