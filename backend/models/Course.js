const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema({
  title: String,
  level: String // Beginner / Intermediate / Advanced
});

module.exports = mongoose.model("Course", courseSchema);
