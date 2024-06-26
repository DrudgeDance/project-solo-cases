import React from 'react';
import { NavLink } from 'react-router-dom';

const CourtDataTableLink = () => {
  return (
    <NavLink 
      to="/dashboard/court-data" 
      className={({ isActive }) => isActive ? "nav-link selected" : "nav-link"}
    >
      Court Data Table
    </NavLink>
  );
};

export default CourtDataTableLink;