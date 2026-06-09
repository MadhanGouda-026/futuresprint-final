const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ["student","admin"], default: "student" },
  phone: String, college: String, course: String, year: String,
  isApproved: { type: Boolean, default: false },
}, { timestamps: true });
userSchema.pre("save", async function(next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 10); next();
});
userSchema.methods.matchPassword = async function(pwd) {
  return await bcrypt.compare(pwd, this.password);
};
module.exports = mongoose.model("User", userSchema);
