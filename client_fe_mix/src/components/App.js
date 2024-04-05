import React, { Suspense, lazy } from 'react';
import { Router, Route, Routes } from 'react-router-dom';
import ProtectedRoute from './../routes/ProtectedRoute.js';

// import Dashboard from './Layout/Dashboard.js'



// Lazy load components with suspense fallback
const loadComponent = (Component) => (props) => (
  <Suspense fallback={<div>Loading...</div>}>
    <Component {...props} />
  </Suspense>
);

const Dashboard = loadComponent(lazy(() => import('./Layout/Dashboard.js')));
const LoginPage = loadComponent(lazy(() => import('./Pages/Public/page_LoginPage.js')));
const SignupPage = loadComponent(lazy(() => import('./Pages/Public/page_SignupPage.js')));

function App() {
  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} /> {/* Signup route */}
      <Route path="/dashboard/*" element={
        <ProtectedRoute allowedRoles={['user', 'admin']}>
          <Dashboard />
        </ProtectedRoute>
      } />
      {/* Optionally, define other routes here */}
    </Routes>
  );
}

export default App;