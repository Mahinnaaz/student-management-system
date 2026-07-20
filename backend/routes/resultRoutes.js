const express = require("express");
const router = express.Router();

const {
  addResult,
  getAllResults,
  getResultByStudentId,
  deleteResult,
  updateResult
} = require("../controllers/resultController");

router.post("/", addResult);

router.get("/", getAllResults);

router.get("/student/:studentId", getResultByStudentId);

router.put("/:id", updateResult);

router.delete("/:id", deleteResult);

module.exports = router;