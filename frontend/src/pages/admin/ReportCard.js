import { useState } from "react";
import axios from "axios";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

function ReportCard() {
  const [studentId, setStudentId] = useState("");
  const [result, setResult] = useState(null);

  const getResult = async () => {
    try {
      const res = await axios.get(
        `http://localhost:5000/api/results/student/${studentId}`
      );

      setResult(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const calculateTotal = () => {
    if (!result) return 0;
    return result.subjects.reduce((acc, s) => acc + Number(s.marks), 0);
  };

  const calculatePercentage = () => {
    if (!result) return 0;
    return (calculateTotal() / (result.subjects.length * 100)) * 100;
  };

  const getGrade = () => {
    const percent = calculatePercentage();

    if (percent >= 90) return "A";
    if (percent >= 75) return "B";
    if (percent >= 50) return "C";
    return "Fail";
  };

  const downloadPDF = () => {
    if (!result) {
      alert("No result found");
      return;
    }

    const doc = new jsPDF();

    doc.text("Student Report Card", 14, 20);
    doc.text(`Name: ${result.studentName}`, 14, 30);
    doc.text(`Student ID: ${result.studentId}`, 14, 40);
    doc.text(`Semester: ${result.semester}`, 14, 50);
    doc.text(`Course: ${result.course}`, 14, 60);
    doc.text(`Email: ${result.studentEmail}`, 14, 70);

    const tableData = result.subjects.map((s) => [
      s.subject,
      s.marks,
    ]);

    autoTable(doc, {
      head: [["Subject", "Marks"]],
      body: tableData,
      startY: 80,
    });

    doc.text(`Total: ${calculateTotal()}`, 14, doc.lastAutoTable.finalY + 10);
    doc.text(
      `Percentage: ${calculatePercentage().toFixed(2)}%`,
      14,
      doc.lastAutoTable.finalY + 20
    );
    doc.text(`Grade: ${getGrade()}`, 14, doc.lastAutoTable.finalY + 30);
    doc.text(`Result: ${getGrade() === "Fail" ? "Fail" : "Pass"}`, 14, doc.lastAutoTable.finalY + 40);
    doc.save("report-card.pdf");
  };

  return (
  <div style={{ background: "#0f172a", minHeight: "100vh", color: "white" }}>

    <div className="container py-5">

      <div className="card bg-dark text-white p-4 mb-4 shadow mx-auto"
        style={{ maxWidth: "500px", borderRadius: "12px" }}>

        <h3 className="text-center mb-3">📄 Generate Report Card</h3>

        <input
          className="form-control mb-3"
          placeholder="Enter Student ID (Ex: STU001)"
          value={studentId}
          onChange={(e) => setStudentId(e.target.value)}
        />

        <button className="btn btn-primary w-100 mb-2" onClick={getResult}>
          Get Results
        </button>

        <button className="btn btn-success w-100" onClick={downloadPDF}>
          Download PDF
        </button>

      </div>

      {result && (
        <div className="card bg-dark text-white p-4 shadow"
          style={{ borderRadius: "12px" }}>

          <h3 className="mb-3">Student Report Card</h3>

          <p><b>Name:</b> {result.studentName}</p>
          <p><b>Student ID:</b> {result.studentId}</p>
          <p><b>Semester:</b> {result.semester}</p>
          <p><b>Course:</b> {result.course}</p>
          <p><b>Email:</b> {result.studentEmail}</p>

          <div style={{ overflowX: "auto" }}>
            <table className="table table-dark mt-3">
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

          <h5>Total: {calculateTotal()}</h5>
          <h5>Percentage: {calculatePercentage().toFixed(2)}%</h5>
          <h5>Grade: {getGrade()}</h5>
          <h5>Remarks: {getGrade() === "Fail" ? "Fail" : "Pass"}</h5>

        </div>
      )}

    </div>
  </div>
);
}

export default ReportCard;