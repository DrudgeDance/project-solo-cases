import React from 'react';
import { NavLink } from 'react-router-dom';

const AdminLink = () => {
  return (
    <NavLink 
      to="/dashboard/admin" 
      className={({ isActive }) => isActive ? "nav-link selected" : "nav-link"}
 
    >
      Admin Page
    </NavLink>
  );
};

export default AdminLink;
