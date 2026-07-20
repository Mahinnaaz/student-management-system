const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Student = require("../models/Student")

exports.register = async (req, res) => {
  try {

    const {
      name,
      email,
      password,
      course,
      semester
    } = req.body;

    // Validation
    if (
      !name ||
      !email ||
      !password ||
      !course ||
      !semester
    ) {
      return res.json({
        success: false,
        message: "Please fill all fields"
      });
    }

    // Check existing email
    const userExists = await User.findOne({ email });

    if (userExists) {
      return res.json({
        success: false,
        message: "Email already exists"
      });
    }

    // Encrypt password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Generate Student ID
    const lastStudent = await User.findOne()
      .sort({ createdAt: -1 });

    let studentId = "STU001";

    if (lastStudent && lastStudent.studentId) {

      const lastNumber = parseInt(
        lastStudent.studentId.replace("STU", "")
      );

      studentId =
        "STU" +
        String(lastNumber + 1).padStart(3, "0");

    }

    // Create User
    await User.create({
      studentId,
      name,
      email,
      password: hashedPassword,
      role: "student",
      course,
      semester
    });

    await Student.create({
      studentId,
      name,
      email,
      course,
      semester
    });

    res.json({
      success: true,
      message:
        "Registration successful. Student ID: " + studentId
    });

  }
  catch (error) {

    console.log(error);

    res.json({
      success: false,
      message: "Server Error"
    });

  }
};


exports.login = async (req, res) => {

  try {

    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {

      return res.json({
        success: false,
        message: "Invalid Email"
      });

    }

    const isMatch = await bcrypt.compare(
      password,
      user.password
    );

    if (!isMatch) {

      return res.json({
        success: false,
        message: "Invalid Password"
      });

    }

    const token = jwt.sign(
      {
        id: user._id,
        role: user.role
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "7d"
      }
    );

    res.json({
      success: true,
      token,
      role: user.role,
      name: user.name,
      email: user.email,
      studentId: user.studentId,
      course: user.course,
      semester: user.semester 
    });

  }
  catch (error) {

    res.json({
      success: false,
      message: "Server Error"
    });

  }

};

exports.getUsers = async (req, res) => {

  try {

    const users = await User.find(
      { role: "student" },
      "-password"
    );

    res.json(users);

  }
  catch (error) {

    res.status(500).json({
      message: error.message
    });

  }

};