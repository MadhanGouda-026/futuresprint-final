const jwt = require("jsonwebtoken");
const User = require("../models/User");
exports.protect = async (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ message: "Not authorized" });
  try {
    const { id } = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(id).select("-password");
    if (!req.user) return res.status(401).json({ message: "User not found" });
    next();
  } catch { res.status(401).json({ message: "Token invalid" }); }
};
exports.admin = (req, res, next) => {
  if (req.user?.role === "admin") return next();
  res.status(403).json({ message: "Admin access required" });
};
