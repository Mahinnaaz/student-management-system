const mongoose = require("mongoose");

const attendanceSchema = new mongoose.Schema(
{
  studentId: String,
  studentName: String,
  studentEmail: String,
  date: String,
  status: String
},
{
  timestamps: true
});

module.exports = mongoose.model("Attendance", attendanceSchema);