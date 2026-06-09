const router = require("express").Router();
const Internship = require("../models/Internship");
const { protect, admin } = require("../middleware/auth");

router.get("/", async (req, res) => {
  try { res.json(await Internship.find({ isActive: true })); } catch(e) { res.status(500).json({ message: e.message }); }
});
router.get("/:id", async (req, res) => {
  try {
    const i = await Internship.findById(req.params.id);
    if (!i) return res.status(404).json({ message: "Not found" });
    res.json(i);
  } catch(e) { res.status(500).json({ message: e.message }); }
});
router.post("/", protect, admin, async (req, res) => {
  try { res.status(201).json(await Internship.create(req.body)); } catch(e) { res.status(500).json({ message: e.message }); }
});
module.exports = router;
