import { useEffect, useState } from "react";
import axios from "axios";

function MyAttendance() {

  const [data, setData] = useState([]);
  const studentId = localStorage.getItem("studentId");

  useEffect(() => {
  const fetchData = async () => {
    try {
      const res = await axios.get(
        `https://student-management-system-0rn7.onrender.com/api/attendance/all?studentId=${studentId}`
      );
      setData(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  fetchData();
  }, [studentId]);

  return (
    <div style={{ background: "#0f172a", minHeight: "100vh", color: "white" }}>

      <div className="container py-5">

        {/* HEADER */}
        <div className="text-center mb-4">
          <h2>📅 My Attendance</h2>
          <p className="text-light opacity-75">
            Track your attendance records
          </p>
        </div>

        {/* CARD */}
        <div
          className="card shadow mx-auto"
          style={{
            background: "#1e293b",
            borderRadius: "12px",
            maxWidth: "900px"
          }}
        >

          <div className="card-body">

            {/* TABLE */}
            <div className="table-responsive">
              <table className="table table-dark table-hover align-middle">

                <thead>
                  <tr>
                    <th>SL no.</th>
                    <th>Date</th>
                    <th>Status</th>
                  </tr>
                </thead>

                <tbody>

                  {data.length > 0 ? (
                    data.map((item, index) => (
                      <tr key={index}>
                        <td>{index + 1}</td>

                        <td>
                          {new Date(item.date).toLocaleDateString()}
                        </td>

                        <td>
                          <span
                            className={`badge ${
                              item.status === "Present"
                                ? "bg-success"
                                : "bg-danger"
                            }`}
                          >
                            {item.status}
                          </span>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="3" className="text-center py-4">
                        No Attendance Records Found
                      </td>
                    </tr>
                  )}

                </tbody>

              </table>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}

export default MyAttendance;