const mongoose = require("mongoose");

const resultSchema = new mongoose.Schema(
{
  studentId: String,

  studentName: String,

  studentEmail: String,

  course: String,

  semester: String,

  subjects: [
    {
      subject: String,
      marks: Number
    }
  ],

  total: Number,

  percentage: Number,

  grade: String
},
{
  timestamps: true
}
);

module.exports = mongoose.model("Result", resultSchema);