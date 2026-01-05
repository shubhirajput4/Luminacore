const User = require("../models/User");

exports.completeCourse = async (req, res) => {
  const { userId, courseName } = req.body;

  const user = await User.findById(userId);

  if (!user.completedCourses.includes(courseName)) {
    user.completedCourses.push(courseName);
  }

  const totalCourses = 3; // Beginner, Intermediate, Advanced
  const completed = user.completedCourses.length;

  user.progress = Math.round((completed / totalCourses) * 100);
  await user.save();

  res.json({
    message: "Course completed",
    progress: user.progress
  });
};
