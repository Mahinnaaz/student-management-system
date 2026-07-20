import { useNavigate } from "react-router-dom";

function StudentDashboard() {

  const name = localStorage.getItem("name");
  const studentId = localStorage.getItem("studentId");
  const course = localStorage.getItem("course");
  const semester = localStorage.getItem("semester");
  const email = localStorage.getItem("email");
  const navigate = useNavigate();

  const logout = () => {
    localStorage.clear();
    window.location.href = "/";
  };

  return (
    <div style={{ background: "#0f172a", minHeight: "100vh", color: "white" }}>

      <div className="container py-5">

        {/* 🔥 HEADER */}
        <div className="d-flex justify-content-between align-items-center mb-4">

          <div>

            <h2 className="fw-bold text-white mb-3">
              👋 Welcome, {name}
            </h2>

            <div
              className="card p-4 shadow"
              style={{
                background: "#1e293b",
                borderRadius: "12px",
                width: "350px"
              }}
            >

              <h5 className="text-info mb-3">
                🎓 Student Details
              </h5>

              <p className="text-white mb-3">
                <b>Student ID:</b> {studentId}
              </p>

              <p className="text-white mb-3">
                <b>Course:</b> {course}
              </p>

              <p className="text-white mb-3">
                <b>Semester:</b> {semester}
              </p>

              <p className="text-white mb-0">
                <b>Email:</b> {email}
              </p>

            </div>

</div>

          <button className="btn btn-danger" onClick={logout}>
            Logout
          </button>

        </div>

        {/* 🔥 CARDS */}
        <div className="row g-4 justify-content-center">

          {/* ATTENDANCE */}
          <div className="col-12 col-md-6 col-lg-4">
            <div
              className="card text-center p-4 shadow h-100"
              style={{
                background: "#1e293b",
                borderRadius: "12px",
                cursor: "pointer",
                transition: "0.3s"
              }}
              onClick={() => navigate("/student/attendance")}
              onMouseEnter={(e) => e.currentTarget.style.transform = "scale(1.05)"}
              onMouseLeave={(e) => e.currentTarget.style.transform = "scale(1)"}
            >
              <h4 className="mb-3 fw-bold text-white">📅 Attendance</h4>
              <p className="text-light opacity-75">
                View your attendance records
              </p>
              <button className="btn btn-primary mt-3">
                Go
              </button>
            </div>
          </div>

          {/* RESULTS */}
          <div className="col-12 col-md-6 col-lg-4">
            <div
              className="card text-center p-4 shadow h-100"
              style={{
                background: "#1e293b",
                borderRadius: "12px",
                cursor: "pointer",
                transition: "0.3s"
              }}
              onClick={() => navigate("/student/results")}
              onMouseEnter={(e) => e.currentTarget.style.transform = "scale(1.05)"}
              onMouseLeave={(e) => e.currentTarget.style.transform = "scale(1)"}
            >
              <h4 className="mb-3 fw-bold text-white">📊 Results</h4>
              <p className="text-light opacity-75">
                Check your marks & performance
              </p>
              <button className="btn btn-success mt-3">
                Go
              </button>
            </div>
          </div>

          {/* REPORT CARD */}
          <div className="col-12 col-md-6 col-lg-4">
            <div
              className="card text-center p-4 shadow h-100"
              style={{
                background: "#1e293b",
                borderRadius: "12px",
                cursor: "pointer",
                transition: "0.3s"
              }}
              onClick={() => navigate("/student/report")}
              onMouseEnter={(e) => e.currentTarget.style.transform = "scale(1.05)"}
              onMouseLeave={(e) => e.currentTarget.style.transform = "scale(1)"}
            >
              <h4 className="mb-3 fw-bold text-white">📄 Report Card</h4>
              <p className="text-light opacity-75">
                Download your report card
              </p>
              <button className="btn btn-info mt-3 text-white">
                Go
              </button>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}

export default StudentDashboard;