const router = require("express").Router();
const User = require("../models/User");
const Application = require("../models/Application");
const Certificate = require("../models/Certificate");
const Internship = require("../models/Internship");
const { protect, admin } = require("../middleware/auth");

router.get("/stats", protect, admin, async (req, res) => {
  try {
    const [students,applications,certificates,internships,pending,approved] = await Promise.all([
      User.countDocuments({role:"student"}), Application.countDocuments(),
      Certificate.countDocuments(), Internship.countDocuments({isActive:true}),
      Application.countDocuments({status:"pending"}), Application.countDocuments({status:"approved"}),
    ]);
    res.json({ students, applications, certificates, internships, pending, approved });
  } catch(e) { res.status(500).json({ message: e.message }); }
});
router.get("/students", protect, admin, async (req, res) => {
  try { res.json(await User.find({role:"student"}).select("-password")); } catch(e) { res.status(500).json({ message: e.message }); }
});
router.put("/students/:id/approve", protect, admin, async (req, res) => {
  try { res.json(await User.findByIdAndUpdate(req.params.id,{isApproved:true},{new:true}).select("-password")); } catch(e) { res.status(500).json({ message: e.message }); }
});
router.delete("/students/:id", protect, admin, async (req, res) => {
  try { await User.findByIdAndDelete(req.params.id); res.json({message:"Deleted"}); } catch(e) { res.status(500).json({ message: e.message }); }
});
module.exports = router;
