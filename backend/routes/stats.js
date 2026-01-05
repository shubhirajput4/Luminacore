const express = require("express");
const router = express.Router();
const User = require("../models/User");

router.get("/:username", async (req, res) => {
  const { username } = req.params;

  const user = await User.findOne({ username });

  if (!user) {
    return res.json({
      enrolledCourses: 0,
      completedCourses: 0,
      learningHours: 0,
      points: 0
    });
  }

  res.json({
    enrolledCourses: user.enrolledCourses,
    completedCourses: user.completedCourses,
    learningHours: user.learningHours,
    points: user.points
  });
});

module.exports = router;
