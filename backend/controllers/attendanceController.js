const Attendance = require("../models/Attendance");

exports.markAttendance = async (req, res) => {
  try {
    const { userId, image } = req.body;

    const attendance = new Attendance({
      userId,
      image,
      date: new Date()
    });

    await attendance.save();
    res.json({ message: "Attendance marked successfully" });
  } catch (err) {
    res.status(500).json({ message: "Attendance error" });
  }
};

exports.getUserAttendance = async (req, res) => {
  try {
    const data = await Attendance.find({ userId: req.params.userId });
    res.json(data);
  } catch (err) {
    res.status(500).json({ message: "Fetch error" });
  }
};
