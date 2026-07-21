# 🎓 Student Management System

A full-stack Student Management System built using the MERN Stack (MongoDB, Express.js, React.js, Node.js).

The system provides role-based access for Admins and Students, enabling attendance management, result management, report card generation, and student record management.

---

## 🚀 Live Demo

### Frontend

[YOUR_FRONTEND_URL](https://student-management-system-frontend-cies.onrender.com)

### Backend API

[YOUR_BACKEND_URL](https://student-management-system-0rn7.onrender.com)

### GitHub Repository

[YOUR_GITHUB_REPO_URL](https://github.com/Mahinnaaz/student-management-system.git)

---

## 📌 Features

### 👨‍💼 Admin Module

* Admin Login
* View Student Records
* Mark Attendance
* View Student Attendance
* Add Student Results
* Generate Report Cards
* Dashboard Management

### 👨‍🎓 Student Module

* Student Registration
* Student Login
* View Attendance
* View Results
* View Report Card
* Personalized Dashboard

---

## 🛠 Tech Stack

### Frontend

* React.js
* React Router DOM
* Axios
* Bootstrap
* CSS

### Backend

* Node.js
* Express.js
* JWT Authentication

### Database

* MongoDB Atlas
* Mongoose

### Deployment

* Render

---

## 📂 Project Structure

student-management-system/

├── frontend/
│
├── public/
│
├── src/
│
├── pages/
│ │
│ ├── admin/
│ │ ├── Dashboard.js
│ │ ├── Attendance.js
│ │ ├── Results.js
│ │ ├── ReportCard.js
│ │ └── ViewAttendance.js
│ │
│ ├── student/
│ │ ├── StudentDashboard.js
│ │ ├── MyAttendance.js
│ │ ├── MyResults.js
│ │ └── StudentReportCard.js
│ │
│ ├── Home.js
│ ├── Login.js
│ └── Register.js
│
├── App.js
├── index.js
│
├── package.json
└── .env

├── backend/
│
├── config/
│ └── db.js
│
├── controllers/
│ ├── authController.js
│ ├── studentController.js
│ ├── attendanceController.js
│ └── resultController.js
│
├── models/
│ ├── User.js
│ ├── Student.js
│ ├── Attendance.js
│ └── Result.js
│
├── routes/
│ ├── authRoutes.js
│ ├── studentRoutes.js
│ ├── attendanceRoutes.js
│ └── resultRoutes.js
│
├── server.js
├── package.json
└── .env

├── .gitignore
├── package.json
└── README.md

---

## 🔐 Authentication & Security

* JWT-based Authentication
* Role-Based Access Control
* Protected Admin Routes
* Protected Student Routes
* Secure MongoDB Atlas Connection

---

## ⚙️ Installation & Setup

### Clone Repository

```bash
git clone YOUR_GITHUB_REPO_URL
```

### Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file:

```env
PORT=5000
MONGO_URI=YOUR_MONGODB_CONNECTION_STRING
JWT_SECRET=YOUR_SECRET_KEY
```

Run Backend:

```bash
npm run dev
```

### Frontend Setup

```bash
cd frontend
npm install
```

Create a `.env` file:

```env
REACT_APP_API_URL=http://localhost:5000
```

Run Frontend:

```bash
npm start
```

---

## 🌟 Future Improvements

* Attendance Analytics Dashboard
* Student Performance Graphs
* Email Notifications
* Export Report Cards as PDF
* Admin Activity Logs
* Mobile Responsive Enhancements

---

## 👨‍💻 Author

**Mahin Naaz**

Built using the **MERN Stack (MongoDB, Express.js, React.js, Node.js)**.
