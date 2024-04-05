// ProtectedRoute.js
import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';

const ProtectedRoute = ({ children, allowedRoles }) => {
  const location = useLocation();
  const user = JSON.parse(localStorage.getItem('user')); // Example user object from localStorage

  if (!user) {
    // User not authenticated
    return <Navigate to="/" replace state={{ from: location }} />;
  }

  const hasRequiredRole = user.roles.some(role => allowedRoles.includes(role));

  if (!hasRequiredRole) {
    // User authenticated but does not have the required role
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;