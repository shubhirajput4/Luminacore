const express = require("express");
const router = express.Router();
const { getProgress } = require("../controllers/progressController");

router.get("/:userId", getProgress);

module.exports = router;
