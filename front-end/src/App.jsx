import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AOS from 'aos';
import 'aos/dist/aos.css';

import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import AdminRoute from './components/AdminRoute';
import StudentRoute from './components/StudentRoute';
import CreateTest from './pages/CreateTest';
import AssignTest from './pages/AsignTest';
import Results from './pages/Results';
import CreateQuestion from './pages/CreateQuestion';
import AdminDashboard from './pages/AdminDashboard';
import StudentDashboard from './pages/StudentDashboard';
import TakeTest from './pages/TakeTest';
import StudentResults from './pages/StudentResults';
import ShowTestQuestions from './pages/ShowTestQuestions';
import Header from './components/Header';
import Footer from './components/Footer';

export default function App() {
  useEffect(() => {
    AOS.init({ duration: 600, once: true }); // Customize as needed
  }, []);

  return (
    <Router>
      <Header />
      <main className="min-h-screen">
        <Routes>
          {/* Public routes */}
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/student/take-test/:testId" element={<ShowTestQuestions />} />

          {/* Admin routes */}
          <Route
            path="/admin/dashboard"
            element={
              <AdminRoute>
                <AdminDashboard />
              </AdminRoute>
            }
          />
          <Route
            path="/admin/create-question"
            element={
              <AdminRoute>
                <CreateQuestion />
              </AdminRoute>
            }
          />
          <Route
            path="/admin/create-test"
            element={
              <AdminRoute>
                <CreateTest />
              </AdminRoute>
            }
          />
          <Route
            path="/admin/assign-test"
            element={
              <AdminRoute>
                <AssignTest />
              </AdminRoute>
            }
          />
          <Route
            path="/admin/results"
            element={
              <AdminRoute>
                <Results />
              </AdminRoute>
            }
          />

          {/* Student routes */}
          <Route
            path="/student/dashboard"
            element={
              <StudentRoute>
                <StudentDashboard />
              </StudentRoute>
            }
          />
          <Route
            path="/student/results"
            element={
              <StudentRoute>
                <StudentResults />
              </StudentRoute>
            }
          />
        </Routes>
      </main>
      <Footer />
    </Router>
  );
}
