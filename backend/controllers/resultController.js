const Result = require("../models/Result");

// SUBJECTS
const courseSubjects = {
  BCA: ["Java", "DBMS", "C programming", "Python", "Web programming"],
  BBA: ["Management", "Marketing", "Finance", "HR", "Economics"],
  BCom: ["Accounting", "Business Law", "Tax", "Economics", "Auditing"]
};

// GRADE FUNCTION
const getGrade = (per) => {
  if (per >= 90) return "A+";
  if (per >= 75) return "A";
  if (per >= 60) return "B";
  if (per >= 50) return "C";
  return "Fail";
};

// ADD / UPDATE RESULT
exports.addResult = async (req, res) => {
  try {

    const {
      studentId,
      studentName,
      studentEmail,
      course,
      semester,
      subjects
    } = req.body;

   // console.log(subjects);
   // console.log(subjects.length);

    const total = subjects.reduce(
  (sum, s) => sum + Number(s.marks || 0),
  0
);

const percentage =
  subjects.length > 0
    ? total / subjects.length
    : 0;

    const grade = getGrade(percentage);

    const existing = await Result.findOne({
      studentEmail
    });

    // UPDATE IF ALREADY EXISTS
    if (existing) {

      const updated = await Result.findByIdAndUpdate(
        existing._id,
        {
          studentId,
          studentName,
          studentEmail,
          course,
          semester,
          subjects,
          total,
          percentage,
          grade
        },
        { returnDocument: "after" }
      );

      return res.json(updated);
    }

    // CREATE NEW
    const result = await Result.create({
      studentId,
      studentName,
      studentEmail,
      course,
      semester,
      subjects,
      total,
      percentage,
      grade
    });

    res.json(result);

  } catch (err) {

    console.log(err);

    res.status(500).json({
      message: "Error"
    });

  }
};


// GET ALL RESULTS
exports.getAllResults = async (req, res) => {
  try {

    const results = await Result.find();

    res.json(results);

  } catch (err) {

    res.status(500).json({
      message: "Error"
    });

  }
};


// UPDATE RESULT
exports.updateResult = async (req, res) => {
  try {

    const {
      studentId,
      studentName,
      studentEmail,
      course,
      semester,
      subjects
    } = req.body;

    const total = subjects.reduce(
      (sum, s) => sum + Number(s.marks || 0 ),
      0
    );

    const percentage = total / subjects.length;

    const grade = getGrade(percentage);

    const updated = await Result.findByIdAndUpdate(
      req.params.id,
      {
        studentId,
        studentName,
        studentEmail,
        course,
        semester,
        subjects,
        total,
        percentage,
        grade
      },
      { returnDocument: "after" }
    );

    res.json(updated);

  } catch (err) {

    res.status(500).json({
      message: "Error updating result"
    });

  }
};


// GET RESULT BY STUDENT ID
// GET RESULT BY STUDENT ID
exports.getResultByStudentId = async (req, res) => {
  try {

    const data = await Result.findOne({
      studentId: req.params.studentId
    });

    if (!data) {
      return res.status(404).json({
        message: "No result found"
      });
    }

    res.json(data);

  } catch (err) {

    res.status(500).json({
      message: "Error fetching result"
    });

  }
};

// DELETE RESULT
exports.deleteResult = async (req, res) => {

  try {

    await Result.findByIdAndDelete(req.params.id);

    res.json({
      message: "Deleted"
    });

  } catch (err) {

    res.status(500).json({
      message: "Error deleting result"
    });

  }

};