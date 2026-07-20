import { useEffect, useState } from "react";
import axios from "axios";

function MyResults() {

  const [data, setData] = useState([]);
  const [student, setStudent] = useState(null);

  const studentId = localStorage.getItem("studentId");

  useEffect(() => {

    const fetchData = async () => {

      try {

        const res = await axios.get(
          `http://localhost:5000/api/results/student/${studentId}`
        );

        console.log(res.data);

        // ✅ STORE STUDENT DATA
        setStudent(res.data);

        // ✅ STORE SUBJECTS
        if (res.data.subjects) {
          setData(res.data.subjects);
        } else {
          setData([]);
        }

      } catch (err) {

        console.log(err);

        setData([]);
        setStudent(null);

      }

    };

    fetchData();

  }, [studentId]);

  // TOTAL
  const totalMarks = data.reduce(
    (sum, item) => sum + Number(item.marks),
    0
  );

  // AVERAGE
  const averageMarks =
    data.length > 0
      ? (totalMarks / data.length).toFixed(2)
      : 0;

  // PERCENTAGE
  const percentage =
    data.length > 0
      ? ((totalMarks / (data.length * 100)) * 100).toFixed(2)
      : 0;

  // GRADE
  const getGrade = () => {

    if (percentage >= 90) return "A";
    if (percentage >= 75) return "B";
    if (percentage >= 50) return "C";

    return "Fail";
  };

  return (

    <div
      style={{
        background: "#0f172a",
        minHeight: "100vh",
        color: "white"
      }}
    >

      <div className="container py-5">

        {/* HEADER */}
        <div className="text-center mb-4">

          <h2 className="fw-bold">
            📊 My Results
          </h2>

          <p className="text-light opacity-75">
            View your academic performance
          </p>

        </div>

        {/* STUDENT INFO */}
        {student && (

          <div
            className="card shadow border-0 mb-4"
            style={{
              background: "#1e293b",
              borderRadius: "16px"
            }}
          >

            <div className="card-body">

              <div className="row text-center">

                <div className="col-md-3 mb-3">

                  <h6 className="text-info">
                    Student Name
                  </h6>

                  <p className="mb-0 text-white">
                    {student.studentName}
                  </p>

                </div>

                <div className="col-md-3 mb-3">

                  <h6 className="text-info">
                    Student ID
                  </h6>

                  <p className="mb-0 text-white">
                    {student.studentId}
                  </p>

                </div>

                <div className="col-md-3 mb-3">

                  <h6 className="text-info">
                    Semester
                  </h6>

                  <p className="mb-0 text-white">
                    {student.semester}
                  </p>

                </div>

                <div className="col-md-3 mb-3">

                  <h6 className="text-info">
                    Course
                  </h6>

                  <p className="mb-0 text-white">
                    {student.course}
                  </p>

                </div>

              </div>

            </div>

          </div>

        )}

        {/* RESULT TABLE */}
        <div
          className="card shadow border-0"
          style={{
            background: "#1e293b",
            borderRadius: "16px"
          }}
        >

          <div className="card-body">

            {/* TOP SECTION */}
            <div className="d-flex justify-content-between align-items-center flex-wrap mb-4">

              <h4 className="mb-2 text-white">
                Subject Marks
              </h4>

              <div className="d-flex gap-2 flex-wrap">

                <span className="badge bg-primary p-2">
                  Total: {totalMarks}
                </span>

                <span className="badge bg-success p-2">
                  Average: {averageMarks}
                </span>

              </div>

            </div>

            {/* RESPONSIVE TABLE */}
            <div className="table-responsive">

              <table className="table table-dark table-hover align-middle text-center">

                <thead>

                  <tr>
                    <th>No.</th>
                    <th>Subject</th>
                    <th>Marks</th>
                    <th>Status</th>
                  </tr>

                </thead>

                <tbody>

                  {data.length > 0 ? (

                    data.map((item, index) => (

                      <tr key={index}>

                        <td>{index + 1}</td>

                        <td>{item.subject}</td>

                        <td>{item.marks}</td>

                        <td>

                          {item.marks >= 35 ? (

                            <span className="badge bg-success">
                              Pass
                            </span>

                          ) : (

                            <span className="badge bg-danger">
                              Fail
                            </span>

                          )}

                        </td>

                      </tr>

                    ))

                  ) : (

                    <tr>

                      <td
                        colSpan="4"
                        className="text-center py-4"
                      >
                        No Results Found
                      </td>

                    </tr>

                  )}

                </tbody>

              </table>

            </div>

            <div className="mt-4 text-white">

              <h4>Total Marks : {totalMarks}</h4>

              <h4>Percentage : {percentage}%</h4>

              <h4>Grade : {getGrade()}</h4>

                <hr className="text-white" />

                  <h4>
                    Overall Result :
                    <span
                      className={
                        data.every(item => item.marks >= 35)
                          ? "text-success"
                          : "text-danger"
                      }
                    >
                      {data.every(item => item.marks >= 35)
                        ? " PASS ✅"
                        : " FAIL ❌"}
                    </span>
                  </h4>

            </div>

          </div>

        </div>

      </div>

    </div>

  );
}

export default MyResults;