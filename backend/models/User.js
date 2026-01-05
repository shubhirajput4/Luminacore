const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: String,
  email: String,

  enrolledCourses: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Course"
  }],

  completedCourses: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Course"
  }],

  progress: {
    type: Number,
    default: 0
  }
});



module.exports = mongoose.models.User || mongoose.model("User", userSchema);

