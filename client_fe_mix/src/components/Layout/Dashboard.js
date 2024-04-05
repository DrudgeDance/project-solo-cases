import React, { Suspense, lazy } from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './Navbar.js'; // Assuming Navbar is not lazily loaded for simplicity
import ProtectedRoute from './../../routes/ProtectedRoute.js';

const Pollers = lazy(() => import('./../Pages/Admin/page_Pollers.js'));
const CourtDataTable = lazy(() => import('./../Pages/User/page_CourtDataTable.js'));

const Dashboard = () => {
  return (
    <div>
      <Navbar />
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="pollers" element={
            <ProtectedRoute allowedRoles={['admin']}>
              <Pollers />
            </ProtectedRoute>
          } />
          <Route path="court-data" element={
            <ProtectedRoute allowedRoles={['user', 'admin']}>
              <CourtDataTable />
            </ProtectedRoute>
          } />
          {/* Add more sub-routes or components as needed */}
        </Routes>
      </Suspense>
    </div>
  );
};

export default Dashboard;