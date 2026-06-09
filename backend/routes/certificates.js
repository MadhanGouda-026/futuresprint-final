const router = require("express").Router();
const Certificate = require("../models/Certificate");
const Application = require("../models/Application");
const { protect, admin } = require("../middleware/auth");
const { v4: uuidv4 } = require("uuid");
const QRCode = require("qrcode");

router.post("/generate", protect, admin, async (req, res) => {
  try {
    const { studentId, applicationId, studentName, internshipTitle, domain, duration } = req.body;
    const certId = "FS-" + uuidv4().split("-")[0].toUpperCase();
    const verifyUrl = `${process.env.FRONTEND_URL || "http://localhost:3000"}/verify/${certId}`;
    const qrCode = await QRCode.toDataURL(verifyUrl);
    const cert = await Certificate.create({ student:studentId, application:applicationId, certificateId:certId, studentName, internshipTitle, domain, duration, qrCode });
    if (applicationId) await Application.findByIdAndUpdate(applicationId, { status:"completed", completedAt:new Date() });
    res.status(201).json(cert);
  } catch(e) { res.status(500).json({ message: e.message }); }
});

router.get("/verify/:certId", async (req, res) => {
  try {
    const cert = await Certificate.findOne({ certificateId: req.params.certId });
    if (!cert) return res.status(404).json({ valid: false, message: "Certificate not found" });
    res.json({ valid: cert.isValid, certificate: cert });
  } catch(e) { res.status(500).json({ message: e.message }); }
});

router.get("/my", protect, async (req, res) => {
  try { res.json(await Certificate.find({ student: req.user._id })); } catch(e) { res.status(500).json({ message: e.message }); }
});

router.get("/", protect, admin, async (req, res) => {
  try { res.json(await Certificate.find().populate("student","name email")); } catch(e) { res.status(500).json({ message: e.message }); }
});
module.exports = router;
