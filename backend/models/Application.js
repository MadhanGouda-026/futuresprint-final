const mongoose = require("mongoose");
const applicationSchema = new mongoose.Schema({
  student: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  internship: { type: mongoose.Schema.Types.ObjectId, ref: "Internship", required: true },
  status: { type: String, enum: ["pending","approved","rejected","completed"], default: "pending" },
  githubLink: String, reportUrl: String, progress: { type: Number, default: 0 },
  adminNotes: String, appliedAt: { type: Date, default: Date.now }, completedAt: Date,
}, { timestamps: true });
module.exports = mongoose.model("Application", applicationSchema);
