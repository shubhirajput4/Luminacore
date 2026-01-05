const mongoose = require("mongoose");

const AttendanceSchema = new mongoose.Schema({
  userId: String,
  image: String,
  date: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Attendance", AttendanceSchema);
