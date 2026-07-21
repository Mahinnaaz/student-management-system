import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        "https://student-management-system-0rn7.onrender.com/api/auth/login",
        { email, password }
      );

      if (res.data.success) {
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("role", res.data.role);
        localStorage.setItem("name", res.data.name);
        localStorage.setItem("email", email);
        localStorage.setItem("studentId", res.data.studentId);
        localStorage.setItem("course", res.data.course);
        localStorage.setItem("semester", res.data.semester);

        if (res.data.role === "admin") {
          navigate("/admin/dashboard");
        } else {
          navigate("/student/dashboard");
        }
      } else {
        alert(res.data.message);
      }
    } catch (error) {
      alert("Login Failed");
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>

        <h2 style={styles.title}>🎓 Login</h2>

        <form onSubmit={submitHandler}>

          <input
            type="email"
            placeholder="Enter Email"
            style={styles.input}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            placeholder="Enter Password"
            style={styles.input}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button style={styles.button}>
            Login
          </button>

        </form>

        <p style={styles.text}>
          New Student?{" "}
          <Link to="/register" style={styles.link}>
            Register Here
          </Link>
        </p>

      </div>
    </div>
  );
}

export default Login;

// 🎨 STYLES (Responsive + Centered)
const styles = {
  container: {
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "linear-gradient(135deg, #1e1e2f, #121212)",
    padding: "15px"
  },
  card: {
    width: "100%",
    maxWidth: "350px",
    background: "#1f1f2e",
    padding: "30px",
    borderRadius: "12px",
    boxShadow: "0 8px 20px rgba(0,0,0,0.5)"
  },
  title: {
    color: "#fff",
    textAlign: "center",
    marginBottom: "20px"
  },
  input: {
    width: "100%",
    padding: "12px",
    marginBottom: "15px",
    borderRadius: "6px",
    border: "none",
    outline: "none",
    fontSize: "14px"
  },
  button: {
    width: "100%",
    padding: "12px",
    background: "#28a745",
    color: "#fff",
    border: "none",
    borderRadius: "6px",
    fontWeight: "bold",
    cursor: "pointer"
  },
  text: {
    color: "#ccc",
    textAlign: "center",
    marginTop: "15px",
    fontSize: "14px"
  },
  link: {
    color: "#00bfff",
    textDecoration: "none"
  }
};