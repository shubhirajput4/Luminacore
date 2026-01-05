const express = require("express");
const router = express.Router();
const { completeCourse } = require("../controllers/courseController");

router.post("/complete", completeCourse);

module.exports = router;
