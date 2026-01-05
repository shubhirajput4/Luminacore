const express = require("express");
const router = express.Router();
const Announcement = require("../models/Announcement");


// 🔹 GET announcements (Dashboard)
router.get("/", async (req, res) => {
  try {
    const announcements = await Announcement.find()
      .sort({ createdAt: -1 })
      .limit(5);

    res.json(announcements);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});


// 🔹 POST announcement (Testing / Admin)
router.post("/", async (req, res) => {
  try {
    const { title, message, type } = req.body;

    const newAnnouncement = new Announcement({
      title,
      message,
      type
    });

    await newAnnouncement.save();
    res.json(newAnnouncement);
  } catch (err) {
    res.status(400).json({ error: "Invalid data" });
  }
});

module.exports = router;
