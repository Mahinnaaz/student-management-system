import { useState } from "react";
import axios from "axios";

function Register() {

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    course: "",
    semester: ""
  });

  const changeHandler = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    // Validation
    if (
      !form.name ||
      !form.email ||
      !form.password ||
      !form.course ||
      !form.semester
    ) {
      alert("Please fill all fields");
      return;
    }

    try {

      const res = await axios.post(
        "https://student-management-system-0rn7.onrender.com/api/auth/register",
        form
      );

      alert(res.data.message);

      if (res.data.success) {
        window.location.href = "/login";
      }

    } catch {

      alert("Registration Failed");

    }
  };

  return (
    <div style={container}>

      <div style={card}>

        <h2 style={{ textAlign: "center", marginBottom: "20px" }}>
          🎓 Student Registration
        </h2>

        <form onSubmit={submitHandler} style={formGrid}>

          <input
            style={input}
            name="name"
            placeholder="Full Name"
            value={form.name}
            onChange={changeHandler}
          />

          <input
            style={input}
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={changeHandler}
          />

          <input
            style={input}
            type="password"
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={changeHandler}
          />

          <select
            style={input}
            name="course"
            value={form.course}
            onChange={changeHandler}
          >
            <option value="">Select Course</option>
            <option>BCA</option>
            <option>BBA</option>
            <option>BCom</option>
          </select>

          <select
          style={input}
          name="semester"
          value={form.semester}
          onChange={changeHandler}
          >
            <option value="">Select Semester</option>
            <option>1</option>
            <option>2</option>
            <option>3</option>
            <option>4</option>
            <option>5</option>
            <option>6</option>
            </select>

            <button style={button}>
            Register
          </button>


        </form>
        <p style={{ textAlign: "center", marginTop: "15px" }}>
          Already have an account?{" "}
          <a href="/login" style={{ color: "#38bdf8" }}>
            Login
          </a>
          
        </p>

      </div>

    </div>

  );
}

export default Register;

const container = {
  minHeight: "100vh",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  background: "linear-gradient(135deg,#0f172a,#020617)"
};

const card = {
  width: "100%",
  maxWidth: "500px",
  padding: "30px",
  borderRadius: "12px",
  background: "#1e293b",
  boxShadow: "0 10px 30px rgba(0,0,0,0.6)",
  color: "white"
};

const formGrid = {
  display: "grid",
  gridTemplateColumns: "1fr 1fr",
  gap: "15px"
};

const input = {
  padding: "10px",
  borderRadius: "6px",
  border: "none",
  outline: "none"
};

const button = {
  gridColumn: "span 2",
  padding: "12px",
  border: "none",
  borderRadius: "6px",
  background: "#22c55e",
  color: "white",
  fontWeight: "bold",
  cursor: "pointer"
};