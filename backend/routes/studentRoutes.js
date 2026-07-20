const express = require("express");
const router = express.Router();

const {
  addStudent,
  getStudents,
  updateStudent,
  deleteStudent,
  getStudentByStudentId
} = require("../controllers/studentController");

router.post("/", addStudent);
router.get("/", getStudents);
router.put("/:id", updateStudent);
router.delete("/:id", deleteStudent);
router.get("/studentid/:studentId", getStudentByStudentId);

module.exports = router;