import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

function Dashboard() {
  
  const navigate = useNavigate();
  
  const [students, setStudents] = useState([]);
  const [results, setResults] = useState([]);

  const [search, setSearch] = useState("");
  const [courseFilter, setCourseFilter] = useState("");
  const [semesterFilter, setSemesterFilter] = useState("");

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [course, setCourse] = useState("");
  const [semester, setSemester] = useState("");

  const [editId, setEditId] = useState(null);

  // 🔥 FETCH DATA
  const getStudents = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/students");
      setStudents(res.data || []);
    } catch {
      setStudents([]);
    }
  };

  const getResults = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/results");
      setResults(res.data || []);
    } catch {
      setResults([]);
    }
  };

  // 🔥 MERGE STUDENT + RESULT
  const mergedData = students.map((s, index) => {
    const r = results.find((r) => r.studentEmail === s.email);

    return {
      id: index + 1,
      _id: s._id,
      studentId: s.studentId || "",
      name: s.name || "",
      email: s.email || "",
      course: s.course || "",
      semester: s.semester || "",
      total: r?.total ?? 0,
      percentage: r?.percentage ?? 0,
    };
  });

  // 🔥 TOP SCORE
  const topScore =
    mergedData.length > 0
      ? Math.max(...mergedData.map((s) => Number(s.total) || 0))
      : 0;

  // 🔥 ADD / UPDATE
  const submitHandler = async (e) => {
    e.preventDefault();

    if (!name || !email || !course || !semester) {
      alert("Fill all fields");
      return;
    }

    try {
      if (editId) {
        await axios.put(
          `http://localhost:5000/api/students/${editId}`,
          { name, email, course, semester }
        );
      } else {
        await axios.post("http://localhost:5000/api/students", {
          name,
          email,
          course,
          semester,
        });
      }

      clearForm();
      getStudents();
    } catch {
      alert("Error saving student");
    }
  };

  const editStudent = (item) => {
    setName(item.name);
    setEmail(item.email);
    setCourse(item.course);
    setSemester(item.semester);
    setEditId(item._id);
  };

  const deleteStudent = async (id) => {
    await axios.delete(`http://localhost:5000/api/students/${id}`);
    getStudents();
  };

  const clearForm = () => {
    setName("");
    setEmail("");
    setCourse("");
    setSemester("");
    setEditId(null);
  };

  const logout = () => {
    localStorage.clear();
    window.location.href = "/";
  };

  // 🔥 PDF
  const downloadAllPDF = () => {
    const doc = new jsPDF();

    const rows = mergedData.map((s) => [
      s.studentId,
      s.name,
      s.email,
      s.course,
      s.semester,
      s.total,
      `${Number(s.percentage).toFixed(2)}%`,
    ]);

    autoTable(doc, {
      head: [["Student ID", "Name", "Email", "Course", "Semester", "Total", "%"]],
      body: rows,
    });

    doc.save("students-report.pdf");
  };

  // 🔥 FILTER
  const filteredStudents = mergedData.filter((item) => {
    const searchMatch =
     item.name.toLowerCase().includes(search.toLowerCase()) ||
     item.email.toLowerCase().includes(search.toLowerCase()) ||
     item.studentId.toLowerCase().includes(search.toLowerCase());

    const courseMatch =
     courseFilter === ""
      ? true
      : item.course === courseFilter;

    const semesterMatch =
     semesterFilter === ""
      ? true
      : item.semester === semesterFilter;

    return searchMatch && courseMatch && semesterMatch;
  });

  const courses = [...new Set(students.map((s) => s.course))];
  const semesters = [...new Set(students.map((s) => s.semester))];

  useEffect(() => {
    getStudents();
    getResults();
  }, []);

  return (
    <div style={{ background: "#0f172a", minHeight: "100vh", color: "white" }}>
      
      {/* NAVBAR */}
      <nav style={navStyle}>
        <h4>🎓 Admin Dashboard</h4>

        <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
          <button className="btn btn-info"
            onClick={() => (window.location.href = "/admin/report")}>
            Report
          </button>

          <button className="btn btn-primary"
            onClick={() => (window.location.href = "/admin/results")}>
            Results
          </button>

          <button className="btn btn-warning"
            onClick={() => window.location.href = "/admin/attendance"}>
            Attendance
          </button>

          <button className="btn btn-danger" onClick={logout}>
            Logout
          </button>
        </div>
      </nav>

      <div style={{ padding: "20px" }}>

        {/* 🔥 CARDS */}
        <div style={cardContainer}>
          <div style={cardStyle}>
            <h6>Total Students</h6>
            <h2>{students.length}</h2>
          </div>

          <div style={cardStyle}>
            <h6>Total Courses</h6>
            <h2>{courses.length}</h2>
          </div>

          <div style={cardStyle}>
            <h6>Top Score</h6>
            <h2>{topScore}</h2>
          </div>
        </div>

        {/* FORM */}
        <div style={boxStyle}>
          <h5>{editId ? "Edit Student" : "Add Student"}</h5>

          <form onSubmit={submitHandler} style={formRow}>
            <input style={inputStyle} placeholder="Name"
              value={name} onChange={(e) => setName(e.target.value)} />

            <input style={inputStyle} placeholder="Email"
              value={email} onChange={(e) => setEmail(e.target.value)} />

            <input style={inputStyle} placeholder="Course"
              value={course} onChange={(e) => setCourse(e.target.value)} />

            <input style={inputStyle} placeholder="Semester"
              value={semester} onChange={(e) => setSemester(e.target.value)} />

            <button className="btn btn-success">
              {editId ? "Update" : "Add"}
            </button>
          </form>
        </div>

        {/* FILTER */}
        <div style={boxStyle}>
          <input style={inputStyle}
            placeholder="Search"
            value={search}
            onChange={(e) => setSearch(e.target.value)} />

          <select style={inputStyle}
            value={courseFilter}
            onChange={(e) => setCourseFilter(e.target.value)}>
            <option value="">All Courses</option>
            {courses.map((c, i) => (
              <option key={i}>{c}</option>
            ))}
          </select>

          <select style={inputStyle}
            value={semesterFilter}
            onChange={(e) => setSemesterFilter(e.target.value)}>
            <option value="">All Semesters</option>
            {semesters.map((s, i) => (
              <option key={i}>{s}</option>
            ))}
          </select>

          <button className="btn btn-success" onClick={downloadAllPDF}>
            Download PDF
          </button>
        </div>

        {/* TABLE */}
        <div style={boxStyle}>
          <h5>Students</h5>

          <div style={{ maxHeight: "400px", overflowY: "auto" }}>
            <table className="table table-dark">
              <thead style={{ position: "sticky", top: 0 }}>
                <tr>
                  <th>NO.</th>
                  <th>Student ID</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Course</th>
                  <th>Semester</th>
                  <th>Total</th>
                  <th>Percentage</th>
                  <th>Action</th>
                </tr>
              </thead>

              <tbody>
                {filteredStudents.map((item) => (
                  <tr key={item._id}>
                    <td>{item.id}</td>
                    <td>{item.studentId}</td>
                    <td>{item.name}</td>
                    <td>{item.email}</td>
                    <td>{item.course}</td>
                    <td>{item.semester}</td>
                    <td>{item.total}</td>
                    <td>{Number(item.percentage).toFixed(2)}%</td>

                    <td>
                      <button className="btn btn-warning btn-sm me-2"
                        onClick={() => editStudent(item)}>Edit</button>

                      <button className="btn btn-danger btn-sm"
                        onClick={() => deleteStudent(item._id)}>Delete</button>
                    
                    <button className="btn btn-info btn-sm"
                      onClick={() =>navigate(`/admin/view-attendance/${item.studentId}`,{state: {studentName: item.name}})}>Attendance</button>

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

export default Dashboard;

/* 🔥 STYLES */
const navStyle = {
  background: "#020617",
  padding: "15px 20px",
  display: "flex",
  justifyContent: "space-between",
  flexWrap: "wrap",
};

const cardContainer = {
  display: "flex",
  gap: "15px",
  flexWrap: "wrap",
  marginBottom: "20px",
};

const cardStyle = {
  flex: "1",
  minWidth: "200px",
  background: "#1e293b",
  padding: "20px",
  borderRadius: "10px",
  textAlign: "center",
};

const boxStyle = {
  background: "#1e293b",
  padding: "20px",
  borderRadius: "10px",
  marginBottom: "20px",
};

const formRow = {
  display: "flex",
  gap: "10px",
  flexWrap: "wrap",
  marginTop: "10px",
};

const inputStyle = {
  padding: "10px",
  borderRadius: "5px",
  border: "none",
  flex: "1",
  minWidth: "150px",
};