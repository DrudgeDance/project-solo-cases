import React, { Suspense, lazy } from 'react';
import { Route, Routes } from 'react-router-dom';
import ProtectedRoute from './../routes/ProtectedRoute.js';
import GithubOAuthCallback from './Pages/OAuth/oauth_GithubCallback.js';

import './../styles/default/style_loginPage.css';
import './../styles/default/style_navbar.css'; 
import './../styles/default/style_page.css'; 
import './../styles/default/style_signupPage.css'; 

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
      <Route path="/callback" element={<GithubOAuthCallback />} />
      <Route path="/" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} /> {/* Signup route */}
      <Route path="/dashboard/*" element={
        <ProtectedRoute allowedRoles={['user', 'admin', 'cat', 'dog', 'superadmin']}>
          <Dashboard />
        </ProtectedRoute>
      } />
      {/* Optionally, define other routes here */}
    </Routes>
  );
}

export default App;