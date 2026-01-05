const express = require("express");
const router = express.Router();
const Attendance = require("../models/Attendance");

// MARK attendance
router.post("/mark", async (req, res) => {
  try {
    const { userId, image } = req.body;

    if (!image) {
      return res.json({ success: false, message: "No image received" });
    }

    await Attendance.create({ userId, image });
    res.json({ success: true, message: "Attendance marked successfully" });

  } catch (err) {
    console.log(err);
    res.status(500).json({ success: false });
  }
});

// GET attendance
router.get("/:userId", async (req, res) => {
  const records = await Attendance.find({ userId: req.params.userId });
  res.json(records);
});

module.exports = router;
