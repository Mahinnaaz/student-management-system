import { useEffect, useState } from "react";
import axios from "axios";
import jsPDF from "jspdf";

function Results() {

  const [results, setResults] = useState([]);
  const [editId, setEditId] = useState(null);

  const [form, setForm] = useState({
    studentId: "",
    name: "",
    email: "",
    course: "",
    semester: "",
    marks: []
  });

  const courseSubjects = {
    BCA: ["Java", "DBMS", "C programming", "Python", "Web programming"],
    BBA: ["Management", "Marketing", "Finance", "HR", "Economics"],
    BCom: ["Accounting", "Business Law", "Tax", "Economics", "Auditing"]
  };

  const subjects = courseSubjects[form.course] || [];

  useEffect(() => {
    setForm(prev => ({
      ...prev,
      marks: new Array(subjects.length).fill("")
    }));
  }, [form.course, subjects.length]);

  const getResults = async () => {
    const res = await axios.get("http://localhost:5000/api/results");
    setResults(res.data);
  };

  const fetchStudent = async () => {
  try {

    const res = await axios.get(
      `http://localhost:5000/api/students/studentid/${form.studentId}`
    );

    // console.log(res.data);

    setForm({
      ...form,
      name: res.data.name,
      email: res.data.email,
      course: res.data.course,
      semester: res.data.semester,
    });

  } catch {
    alert("Student not found");
  }
};

  const handleMarks = (i, val) => {
    const updated = [...form.marks];
    updated[i] = val;
    setForm({ ...form, marks: updated });
  };

  const submitHandler = async (e) => {
    e.preventDefault();

      if (subjects.length === 0) {
         alert("Please fetch student details first");
         return;
      }

    if (editId) {
     await axios.put(
      `http://localhost:5000/api/results/${editId}`,
      {
        studentId: form.studentId,
        studentName: form.name,
        studentEmail: form.email,
        course: form.course,
        semester: form.semester,
        subjects: subjects.map((sub, i) => ({
        subject: sub,
        marks: Number(form.marks[i] || 0)
        }))
      }
     );
   } else {
      await axios.post(
      "http://localhost:5000/api/results",
      {
        studentId: form.studentId,
        studentName: form.name,
        studentEmail: form.email,
        course: form.course,
        semester: form.semester,
        subjects: subjects.map((sub, i) => ({
        subject: sub,
        marks: Number(form.marks[i] || 0)
        }))
      }
     );
    }

    // CLEAR FORM
    setForm({
      studentId: "",
      name: "",
      email: "",
      course: "",
      semester: "",
      marks: new Array(subjects.length).fill("")
    });

    setEditId(null);
    getResults();
  };

  const editResult = (r) => {
    setEditId(r._id);

    setForm({
      studentId: r.studentId,
      name: r.studentName,
      email: r.studentEmail,
      course: r.course,
      semester: r.semester,
      marks: r.subjects.map(s => s.marks)
    });
  };

  const deleteResult = async (id) => {
    await axios.delete(`http://localhost:5000/api/results/${id}`);
    getResults();
  };

  // PDF
  const downloadPDF = (r) => {
    const doc = new jsPDF();

    doc.text("Report Card", 20, 20);
    doc.text(`Student ID: ${r.studentId}`, 20, 30);
    doc.text(`Name: ${r.studentName}`, 20, 40);
    doc.text(`Course: ${r.course}`, 20, 50);

    let y = 70;
    r.subjects.forEach(s => {
      doc.text(`${s.subject}: ${s.marks}`, 20, y);
      y += 10;
    });

    doc.text(`Total: ${r.total}`, 20, y + 10);
    doc.text(`Percentage: ${r.percentage?.toFixed(2) || 0}%`, 20, y + 20);
    doc.text(`Grade: ${r.grade}`, 20, y + 30);

    doc.save(`${r.studentName}.pdf`);
  };

  useEffect(() => {
    getResults();
  }, []);

  return (
    <div style={{ background: "#0f172a", minHeight: "100vh", color: "white" }}>

      <div className="container py-4">

        <h2 className="mb-4">📊 Results Management</h2>

        {/* 🔥 FORM */}
        <div className="card bg-dark text-white p-4 mb-4 shadow"
          style={{ borderRadius: "12px" }}>

          <h4>{editId ? "Edit Result" : "Add Result"}</h4>

          <form onSubmit={submitHandler}>

            <div className="col-md-3">
              <input
                className="form-control"
                 placeholder="Student ID"
                 value={form.studentId}
                  onChange={(e) =>
                    setForm({ ...form, studentId: e.target.value })
                 }
                 onKeyDown={(e) => {
                 if (e.key === "Enter") {
                 e.preventDefault();
                 fetchStudent();
               }
               }}
              />
            </div>

            <div className="col-md-2">
             <button
                type="button"
                className="btn btn-info"
                onClick={fetchStudent}
              >
                Fetch
             </button>
            </div>

            <div className="row g-3">

              <div className="col-md-4">
                <input className="form-control"
                  placeholder="Name"
                  value={form.name}
                  readOnly
                />
              </div>

              <div className="col-md-4">
                <input className="form-control"
                  placeholder="Email"
                  value={form.email}
                  readOnly
                />
              </div>

              <div className="col-md-4">
                <input
                className="form-control"
                placeholder="Course"
                value={form.course}
                readOnly
                />
              </div>

                <div className="col-md-4">
                <input
                className="form-control"
                placeholder="Semester"
                value={form.semester}
                readOnly
                />
              </div>

              {/* 🔥 SUBJECT GRID */}
              <div className="col-12">
                <div className="row g-2">
                  {subjects.map((sub, i) => (
                    <div className="col-lg-2 col-md-3 col-6" key={i}>
                      <input
                        className="form-control text-center"
                        placeholder={sub}
                        value={form.marks[i] || ""}
                        onChange={(e) => handleMarks(i, e.target.value)}
                      />
                    </div>
                  ))}
                </div>
              </div>

              <div className="col-md-2">
                <button className="btn btn-success w-100">
                  {editId ? "Update" : "Add"}
                </button>
              </div>

            </div>

          </form>
        </div>

        {/* 🔥 TABLE */}
        <div className="card bg-dark text-white p-3 shadow"
          style={{ borderRadius: "12px" }}>

          <h4>Results List</h4>

          <div style={{
            overflowX: "auto",
            maxHeight: "400px",
            overflowY: "auto"
          }}>

            <table className="table table-dark table-hover text-center mt-3">

              <thead>
                <tr>
                  <th>Student ID</th>
                  <th>Name</th>
                  <th>Course</th>
                  <th>Semester</th>
                  <th>Subjects</th>
                  <th>Total</th>
                  <th>Percentage</th>
                  <th>Grade</th>
                  <th>Action</th>
                </tr>
              </thead>

              <tbody>
                {results.map(r => (
                  <tr key={r._id}>
                    <td>{r.studentId}</td>
                    <td>{r.studentName}</td>
                    <td>{r.course}</td>
                    <td>{r.semester}</td>
                    {/* 🔥 SUBJECT ALIGN FIX */}
                    <td>
                      <div style={{
                        display: "grid",
                        gridTemplateColumns: "repeat(1, 1fr)",
                        gap: "5px",
                        textAlign: "left"
                      }}>
                        {r.subjects?.map(s => (
                          <div key={s.subject}>
                            <b>{s.subject}:</b> {s.marks}
                          </div>
                        ))}
                      </div>
                    </td>

                    <td>{r.total || 0}</td>
                    <td>{r.percentage ? r.percentage.toFixed(2) : 0}%</td>
                    <td>{r.grade}</td>

                    <td>
                      <button className="btn btn-warning btn-sm me-2"
                        onClick={() => editResult(r)}>Edit</button>

                      <button className="btn btn-danger btn-sm me-2"
                        onClick={() => deleteResult(r._id)}>Delete</button>

                      <button className="btn btn-success btn-sm"
                        onClick={() => downloadPDF(r)}>PDF</button>
                    </td>
                  </tr>
                ))}
              </tbody>

            </table>

          </div>

        </div>

      </div>
    </div>
  );
}

export default Results;