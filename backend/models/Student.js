const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema(
{
  studentId: String,
  name: String,
  email: String,
  course: String,
  semester: String
},
{ timestamps: true }
);

module.exports = mongoose.model("Student", studentSchema);