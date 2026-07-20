const Attendance = require("../models/Attendance");
const User = require("../models/User");

// Add Attendance
exports.addAttendance = async (req, res) => {
  try {

    const { studentId, status } = req.body;

    // Find student from database
    const student = await User.findOne({ studentId });

    if (!student) {
      return res.json({
        success: false,
        message: "Student not found"
      });
    }

    // Current date
    const today = new Date().toLocaleDateString("en-CA");

    // Prevent duplicate attendance on same day
    const existing = await Attendance.findOne({
      studentId,
      date: today
    });

    if (existing) {
      return res.json({
        success: false,
        message: "Attendance already marked today"
      });
    }

    await Attendance.create({
      studentId,
      studentName: student.name,
      studentEmail: student.email,
      date: today,
      status
    });

    res.json({
      success: true,
      message: "Attendance Added"
    });

  } catch (error) {

    console.log(error);

    res.json({
      success: false,
      message: "Error"
    });

  }
};


// Get Attendance
exports.getAttendance = async (req, res) => {

  try {

    const studentId = req.query.studentId;

    let data;

    if (studentId) {

      data = await Attendance.find({
        studentId
      });

    } else {

      data = await Attendance.find();

    }

    res.json(data);

  } catch (error) {

    console.log(error);
    res.json([]);

  }

};

// GET ATTENDANCE BY STUDENT ID
exports.getAttendanceByStudent = async (req, res) => {

  try {

    const data = await Attendance.find({
      studentId: req.params.studentId
    }).sort({ date: -1 });

    res.json(data);

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: "Error fetching attendance"
    });

  }

};