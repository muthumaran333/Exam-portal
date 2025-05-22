import React from 'react';
import { Navigate } from 'react-router-dom';

export default function StudentRoute({ children }) {
  const token = localStorage.getItem('token');
  const role = localStorage.getItem('role');

  if (!token || role !== 'student') {
    return <Navigate to="/login" replace />;
  }

  return children;
}
