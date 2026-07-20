const express = require("express");
const router = express.Router();

const {
  addAttendance,
  getAttendance,
  getAttendanceByStudent
} = require("../controllers/attendanceController");

router.post("/add", addAttendance);

router.get("/all", getAttendance);

router.get("/student/:studentId", getAttendanceByStudent);

module.exports = router;