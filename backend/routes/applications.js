const router = require("express").Router();
const Application = require("../models/Application");
const { protect, admin } = require("../middleware/auth");

router.post("/", protect, async (req, res) => {
  try {
    const exists = await Application.findOne({ student: req.user._id, internship: req.body.internship });
    if (exists) return res.status(400).json({ message: "Already applied" });
    const app = await Application.create({ student: req.user._id, ...req.body });
    res.status(201).json(app);
  } catch(e) { res.status(500).json({ message: e.message }); }
});
router.get("/my", protect, async (req, res) => {
  try { res.json(await Application.find({ student: req.user._id }).populate("internship")); } catch(e) { res.status(500).json({ message: e.message }); }
});
router.get("/", protect, admin, async (req, res) => {
  try { res.json(await Application.find().populate("student","name email college").populate("internship","title domain")); } catch(e) { res.status(500).json({ message: e.message }); }
});
router.put("/:id/status", protect, admin, async (req, res) => {
  try { res.json(await Application.findByIdAndUpdate(req.params.id, { status: req.body.status }, { new: true })); } catch(e) { res.status(500).json({ message: e.message }); }
});
module.exports = router;
