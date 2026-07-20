import { useState } from "react";
import axios from "axios";
import jsPDF from "jspdf";

function StudentReportCard() {

  const [result, setResult] = useState(null);
  const studentId = localStorage.getItem("studentId");

  const getResult = async () => {
    try {
      const res = await axios.get(
        `http://localhost:5000/api/results/student/${studentId}`
      );
      setResult(res.data);
    } catch {
      alert("No result found");
    }
  };

  const calculateTotal = () => {
    if (!result) return 0;
    return result.subjects.reduce((sum, s) => sum + Number(s.marks), 0);
  };

  const calculatePercentage = () => {
    if (!result) return 0;
    return (calculateTotal() / (result.subjects.length * 100)) * 100;
  };

  const getGrade = () => {
    const p = calculatePercentage();
    if (p >= 90) return "A";
    if (p >= 75) return "B";
    if (p >= 50) return "C";
    return "Fail";
  };

  // 🔥 PDF SAME FORMAT
  const downloadPDF = () => {
  if (!result) return alert("No data");

  const doc = new jsPDF();

  // Title
  doc.setFontSize(18);
  doc.text("Student Report Card", 14, 20);

  // Details
  doc.setFontSize(12);
  doc.text(`Name: ${result.studentName}`, 14, 35);
  doc.text(`Student ID: ${result.studentId}`, 14, 45);
  doc.text(`Email: ${result.studentEmail}`, 14, 55);
  doc.text(`Course: ${result.course}`, 14, 65);
  doc.text(`Semester: ${result.semester}`, 14, 75);

  // Table setup
  const startY = 85;
  const rowHeight = 10;

  // Header (BLUE like screenshot)
  doc.setFillColor(52, 120, 170);
  doc.rect(14, startY, 180, rowHeight, "F");

  doc.setTextColor(255, 255, 255);
  doc.text("Subject", 20, startY + 7);
  doc.text("Marks", 140, startY + 7);

  // Reset text color
  doc.setTextColor(0, 0, 0);

  let y = startY + rowHeight;

  // Rows (striped like screenshot)
  result.subjects.forEach((s, i) => {
    if (i % 2 === 0) {
      doc.setFillColor(240, 240, 240);
      doc.rect(14, y, 180, rowHeight, "F");
    }

    doc.text(s.subject, 20, y + 7);
    doc.text(String(s.marks), 140, y + 7);

    y += rowHeight;
  });

  // Footer data
  y += 10;
  doc.text(`Total: ${calculateTotal()}`, 14, y);

  y += 10;
  doc.text(`Percentage: ${calculatePercentage().toFixed(2)}%`, 14, y);

  y += 10;
  doc.text(`Grade: ${getGrade()}`, 14, y);
  y += 10;

  doc.text(
    `Overall Result: ${
      result.subjects.every(s => s.marks >= 35)
        ? "PASS"
        : "FAIL"
    }`,
    14,
    y
  );

  doc.save("report-card.pdf");
};

  return (
  <div style={{ background: "#0f172a", minHeight: "100vh", color: "white" }}>

    <div className="container py-4">

      {/* TITLE */}
      <h2 className="text-center mb-4">📄 Student Report Card</h2>

      {/* BUTTONS */}
      <div className="d-flex flex-column flex-md-row justify-content-center gap-2 mb-4">
        <button className="btn btn-primary" onClick={getResult}>
          Get Result
        </button>

        <button className="btn btn-success" onClick={downloadPDF}>
          Download PDF
        </button>
      </div>

      {/* CARD */}
      {result && (
        <div
          className="card bg-dark text-white p-3 p-md-4 shadow mx-auto"
          style={{
            maxWidth: "900px",
            borderRadius: "12px"
          }}
        >

          <h4 className="text-center mb-3">Student Report Card</h4>

          {/* DETAILS */}
          <div className="row mb-3">
            <div className="col-12 col-md-6 mb-2">
              <b>Name:</b> {result.studentName}
            </div>

            <div className="col-12 col-md-6 mb-2">
              <b>Email:</b> {result.studentEmail}
            </div>

            <div className="col-12 col-md-6 mb-2">
              <b>Student ID:</b> {result.studentId}
            </div>

            <div className="col-12 col-md-6 mb-2">
              <b>Course:</b> {result.course}
            </div>

            <div className="col-12 col-md-6 mb-2">
              <b>Semester:</b> {result.semester}
            </div>
          </div>

          {/* TABLE (SCROLL ON MOBILE) */}
          <div className="table-responsive">
            <table className="table table-dark mt-3 mb-3">
              <thead>
                <tr>
                  <th>Subject</th>
                  <th>Marks</th>
                </tr>
              </thead>

              <tbody>
                {result.subjects.map((s, i) => (
                  <tr key={i}>
                    <td>{s.subject}</td>
                    <td>{s.marks}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* SUMMARY */}
          <div className="mt-3">
            <h6>Total: {calculateTotal()}</h6>
            <h6>Percentage: {calculatePercentage().toFixed(2)}%</h6>
            <h6>Grade: {getGrade()}</h6>
            <h6>
              Overall Result:{" "}
              {result.subjects.every(s => s.marks >= 35)
                ? "PASS"
                : "FAIL"}
            </h6>
          </div>

        </div>
      )}

    </div>
  </div>
);
}

export default StudentReportCard;