const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
{
  studentId: String,

  name: String,

  email: {
    type: String,
    unique: true
  },

  password: String,

  role: {
    type: String,
    enum: ["admin", "student"],
    default: "student"
  },

  course: String,

  semester: String

},
{
  timestamps: true
});

module.exports = mongoose.model("User", userSchema);