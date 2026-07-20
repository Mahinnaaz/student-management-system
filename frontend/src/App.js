import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/admin/Dashboard";
import StudentDashboard from "./pages/student/StudentDashboard";
import Attendance from "./pages/admin/Attendance";
import MyAttendance from "./pages/student/MyAttendance";
import Results from "./pages/admin/Results";
import MyResults from "./pages/student/MyResults";
import ReportCard from "./pages/admin/ReportCard";
import StudentReportCard from "./pages/student/StudentReportCard";
import ViewAttendance from "./pages/admin/ViewAttendance";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        <Route
          path="/"
          element={<Home />}
        />

        <Route
          path="/login"
          element={<Login />}
        />

        <Route
          path="/register"
          element={<Register />}
        />

        <Route
          path="/admin/dashboard"
          element={<Dashboard />}
        />

        <Route
          path="/student/dashboard"
          element={<StudentDashboard />}
        />

        <Route
          path="/admin/attendance"
          element={<Attendance />}
        />

        <Route
          path="/student/attendance"
          element={<MyAttendance />}
        />

        <Route 
          path="/admin/results"
          element={<Results />}
        />

        <Route 
          path="/student/results"
          element={<MyResults />}
        />

        <Route
          path="/admin/report"
          element={<ReportCard />}
        />

        <Route
          path="/student/report"
          element={<StudentReportCard />}
        />

        <Route
          path="/admin/view-attendance/:studentId"
          element={<ViewAttendance />}
        />

      </Routes>
    </BrowserRouter>
  );
}

export default App;