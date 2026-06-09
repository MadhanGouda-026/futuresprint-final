const router = require("express").Router();
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const { protect } = require("../middleware/auth");
const genToken = (id) => jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "30d" });

router.post("/register", async (req, res) => {
  try {
    const { name, email, password, phone, college, course, year } = req.body;
    if (await User.findOne({ email })) return res.status(400).json({ message: "Email already registered" });
    const user = await User.create({ name, email, password, phone, college, course, year });
    res.status(201).json({ _id:user._id, name:user.name, email:user.email, role:user.role, isApproved:user.isApproved, token:genToken(user._id) });
  } catch(e) { res.status(500).json({ message: e.message }); }
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user || !(await user.matchPassword(password))) return res.status(401).json({ message: "Invalid credentials" });
    res.json({ _id:user._id, name:user.name, email:user.email, role:user.role, isApproved:user.isApproved, token:genToken(user._id) });
  } catch(e) { res.status(500).json({ message: e.message }); }
});

router.get("/profile", protect, (req, res) => res.json(req.user));
module.exports = router;
