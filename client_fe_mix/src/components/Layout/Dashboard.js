import React, { Suspense, lazy } from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './Navbar.js'; // Assuming Navbar is not lazily loaded for simplicity
import ProtectedRoute from './../../routes/ProtectedRoute.js';

const AdminPage = lazy(() => import('../Pages/Admin/page_AdminPage.js'));
const CourtDataTable = lazy(() => import('./../Pages/User/page_CourtDataTable.js'));
const CatPage = lazy(() => import('../Pages/User/page_CatPage.js'));
const DogPage = lazy(() => import('../Pages/User/page_DogPage.js'));

const Dashboard = () => {
  return (
    <div>
      <Navbar />
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="admin" element={
            <ProtectedRoute allowedRoles={['admin', 'superadmin']}>
              <AdminPage />
            </ProtectedRoute>
          } />
          <Route path="cat" element={
            <ProtectedRoute allowedRoles={['cat', 'superadmin']}>
              <CatPage />
            </ProtectedRoute>
          } />
          <Route path="dog" element={
            <ProtectedRoute allowedRoles={['dog', 'superadmin']}>
              <DogPage />
            </ProtectedRoute>
          } />
          <Route path="court-data" element={
            <ProtectedRoute allowedRoles={['user', 'admin', 'superadmin']}>
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