import { useEffect, useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import axios from "axios";

function ViewAttendance() {

  const { studentId } = useParams();

  const location = useLocation();

  const studentName = location.state?.studentName;
  
  const [attendance, setAttendance] = useState([]);

    useEffect(() => {

    const fetchAttendance = async () => {

        try {

        const res = await axios.get(
            `http://localhost:5000/api/attendance/student/${studentId}`
        );

        setAttendance(res.data);

        } catch (err) {

        console.log(err);

        }

    };

    fetchAttendance();

    }, [studentId]);

  return (
    <div
      style={{
        background: "#0f172a",
        minHeight: "100vh",
        color: "white",
        padding: "20px"
      }}
    >

      <h2 className="mb-4">
        Attendance - {studentName} ({studentId})
      </h2>

      <div className="card bg-dark p-3">

        <table className="table table-dark">

          <thead>
            <tr>
              <th>No.</th>
              <th>Date</th>
              <th>Status</th>
            </tr>
          </thead>

          <tbody>

            {attendance.length > 0 ? (

              attendance.map((item, index) => (

                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{item.date}</td>
                  <td>{item.status}</td>
                </tr>

              ))

            ) : (

              <tr>
                <td colSpan="3" className="text-center">
                  No Attendance Found
                </td>
              </tr>

            )}

          </tbody>

        </table>

      </div>

    </div>
  );
}

export default ViewAttendance;