import { useState } from "react";
import axios from "axios";

function Attendance() {

  const [form, setForm] = useState({
    studentId: "",
    status: "Present"
  });

  const changeHandler = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const submitHandler = async (e) => {

    e.preventDefault();

    try {

      const res = await axios.post(
        "http://localhost:5000/api/attendance/add",
        form
      );

      alert(res.data.message);

      if (res.data.success) {

        setForm({
          studentId: "",
          status: "Present"
        });

      }

    } catch {

      alert("Error");

    }
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

        <div
          className="card shadow p-4 mx-auto"
          style={{
            maxWidth: "500px",
            background: "#5d6675",
            borderRadius: "20px"
          }}
        >

          <h2 className="text-center mb-4">
            📅 Mark Attendance
          </h2>

          <form onSubmit={submitHandler}>

            <input
              className="form-control mb-3"
              placeholder="Student ID (Ex: STU001)"
              name="studentId"
              value={form.studentId}
              onChange={changeHandler}
            />

            <select
              className="form-control mb-4"
              name="status"
              value={form.status}
              onChange={changeHandler}
            >
              <option>Present</option>
              <option>Absent</option>
            </select>

            <button className="btn btn-primary w-100">
              Save Attendance
            </button>

          </form>

        </div>

      </div>

    </div>
  );
}

export default Attendance;