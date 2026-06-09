const mongoose = require("mongoose");
const certificateSchema = new mongoose.Schema({
  student: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  application: { type: mongoose.Schema.Types.ObjectId, ref: "Application" },
  certificateId: { type: String, unique: true, required: true },
  studentName: String, internshipTitle: String, domain: String, duration: String,
  issueDate: { type: Date, default: Date.now }, qrCode: String,
  isValid: { type: Boolean, default: true },
}, { timestamps: true });
module.exports = mongoose.model("Certificate", certificateSchema);
