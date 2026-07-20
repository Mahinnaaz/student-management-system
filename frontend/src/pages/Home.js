import { Link } from "react-router-dom";

function Home() {
  return (
    <div
      style={{
        background: "#0f172a",
        minHeight: "100vh",
        color: "white",
      }}
    >

      {/* NAVBAR */}
      <nav
        className="navbar navbar-expand-lg navbar-dark px-4 py-3"
        style={{
          background: "#111827",
          borderBottom: "1px solid #1e293b",
        }}
        >
           <div className="container-fluid">

          <h3 className="fw-bold text-info m-0">
            🎓 Student Management System
          </h3>

          <div>
            <Link
              to="/login"
              className="btn btn-info fw-bold px-4"
              style={{ borderRadius: "10px" }}
            >
              Login
            </Link>
          </div>

        </div>
      </nav>

      {/* HERO SECTION */}
      <div className="container py-5">

        <div className="row align-items-center">

          {/* LEFT */}
          <div className="col-lg-6 mb-5 mb-lg-0">

            <h1
              className="fw-bold mb-4"
              style={{ fontSize: "3rem", lineHeight: "1.3" }}
            >
              Smart & Modern
              <span className="text-info"> Student Management </span>
              Portal
            </h1>

            <p
              className="text-light opacity-75 mb-4"
              style={{ fontSize: "1.1rem" }}
            >
              Manage students, attendance, results and report cards easily with
              a secure and responsive portal designed for modern institutions.
            </p>

            <div className="d-flex flex-wrap gap-3">

              <Link
                to="/login"
                className="btn btn-info btn-lg fw-bold px-4"
                style={{ borderRadius: "12px" }}
              >
                Get Started
              </Link>

              <Link
                to="/register"
                className="btn btn-outline-light btn-lg px-4"
                style={{ borderRadius: "12px" }}
              >
                Register
              </Link>

            </div>

          </div>

          {/* RIGHT IMAGE */}
          <div className="col-lg-6 text-center">

            <img
              src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=1200&auto=format&fit=crop"
              alt="Students"
              className="img-fluid shadow"
              style={{
                borderRadius: "20px",
                maxHeight: "500px",
                objectFit: "cover",
              }}
            />

          </div>

        </div>

      </div>

      {/* FEATURES */}
      <div className="container pb-5">

        <div className="text-center mb-5">
          <h2 className="fw-bold"
          style={{ color: "#ffffff" }}
          >
            Portal Features
          </h2>
          <p className="text-light opacity-75">
            Everything students and admins need in one place.
          </p>
        </div>

        <div className="row g-4">

          <div className="col-md-4">
            <div
              className="card h-100 border-0 shadow"
              style={{
                background: "#1e293b",
                borderRadius: "18px",
              }}
            >
              <div className="card-body text-center p-4">
                <h1>📚</h1>
                <h3 className="mt-3"
                style={{ color: "#38bdf8" }}
                >Student Records</h3>
                <p className="text-light opacity-75 mt-3">
                  Manage complete student information with secure access.
                </p>
              </div>
            </div>
          </div>

          <div className="col-md-4">
            <div
              className="card h-100 border-0 shadow"
              style={{
                background: "#1e293b",
                borderRadius: "18px",
              }}
            >
              <div className="card-body text-center p-4">
                <h1>📊</h1>
                <h3 className="mt-3"
                style={{ color: "#38bdf8" }}
                >Results & Reports</h3>
                <p className="text-light opacity-75 mt-3">
                  View marks, percentages and download professional report cards.
                </p>
              </div>
            </div>
          </div>

          <div className="col-md-4">
            <div
              className="card h-100 border-0 shadow"
              style={{
                background: "#1e293b",
                borderRadius: "18px",
              }}
            >
              <div className="card-body text-center p-4">
                <h1>🗓️</h1>
                <h3 className="mt-3"
                style={{ color: "#38bdf8" }}
                >
                  Attendance Tracking
                </h3>
                <p className="text-light opacity-75 mt-3">
                  Easily monitor attendance records with a responsive dashboard.
                </p>
              </div>
            </div>
          </div>

        </div>

      </div>

      {/* ABOUT */}
      <div
        className="py-5"
        style={{ background: "#111827" }}
      >
        <div className="container">

          <div className="row align-items-center">

            <div className="col-lg-6 mb-4 mb-lg-0">
              <img
                src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=1200&auto=format&fit=crop"
                alt="Education"
                className="img-fluid shadow"
                style={{ borderRadius: "20px" }}
              />
            </div>

            <div className="col-lg-6">

              <h2 className="fw-bold mb-4">
                About The Portal
              </h2>

              <p className="text-light opacity-75 fs-5">
                This Student Management System helps educational institutions
                manage students, attendance, results and report cards in a
                centralized and efficient manner.
              </p>

              <p className="text-light opacity-75">
                Built using MERN Stack with responsive design and modern UI.
              </p>

            </div>

          </div>

        </div>
      </div>

      {/* CONTACT */}
      <div className="container py-5">

        <div
          className="card border-0 shadow p-4"
          style={{
            background: "#1e293b",
            borderRadius: "20px",
          }}
        >

          <div className="text-center">

            <h2 className="fw-bold mb-4"
              style={{ color: "#ffffff" }}
              >
              📞 Contact Information
            </h2>

            <p className="text-light opacity-75 mb-2">
              Email: support@smsportal.com
            </p>

            <p className="text-light opacity-75 mb-2">
              Phone: +91 9876543210
            </p>

            <p className="text-light opacity-75">
              Address: Bangalore, India
            </p>

          </div>

        </div>

      </div>

      {/* FOOTER */}
      <footer
        className="text-center py-3"
        style={{
          background: "#111827",
          borderTop: "1px solid #1e293b",
        }}
      >
        <p className="m-0 text-light opacity-75">
          © 2026 Student Management System | Developed by Mahin Naaz
        </p>
      </footer>

    </div>
  );
}

export default Home;