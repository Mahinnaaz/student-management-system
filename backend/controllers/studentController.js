const Student = require("../models/Student");
const User = require("../models/User");
const bcrypt = require("bcryptjs");

// Add Student
exports.addStudent = async (req, res) => {
  try {
    const { name, email, course, semester } = req.body;

    // Check if email already exists in User collection
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({
        message: "Email already exists"
      });
    }

    // Generate Student ID
    const lastStudent = await Student.findOne().sort({ createdAt: -1 });

    let studentId = "STU001";

    if (lastStudent && lastStudent.studentId) {
      const lastNumber = parseInt(
        lastStudent.studentId.replace("STU", "")
      );

      studentId =
        "STU" +
        String(lastNumber + 1).padStart(3, "0");
    }

    // Save in Student collection
    const student = await Student.create({
      studentId,
      name,
      email,
      course,
      semester
    });

    // Default password = 123456
    const hashedPassword = await bcrypt.hash("123456", 10);

    // Save in User collection
    await User.create({
      studentId,
      name,
      email,
      password: hashedPassword,
      role: "student",
      course,
      semester
    });

    res.status(201).json(student);

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }
};

// Get All Students
exports.getStudents = async (req, res) => {
  try {

    const students = await Student.find();

    res.json(students);

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }
};

// Update Student
exports.updateStudent = async (req, res) => {
  try {

    const student = await Student.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    // Update User collection also
    await User.findOneAndUpdate(
      { email: student.email },
      req.body
    );

    res.json(student);

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }
};

// Delete Student
exports.deleteStudent = async (req, res) => {
  try {

    const student = await Student.findById(req.params.id);

    if (student) {
      await User.findOneAndDelete({
        email: student.email
      });
    }

    await Student.findByIdAndDelete(req.params.id);

    res.json({
      message: "Student Deleted Successfully"
    });

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }
};

exports.getStudentByStudentId = async (req, res) => {
  try {
    const student = await Student.findOne({
      studentId: req.params.studentId
    });

    if (!student) {
      return res.status(404).json({
        message: "Student not found"
      });
    }

    res.json(student);

  } catch (err) {
    res.status(500).json({
      message: err.message
    });
  }
};