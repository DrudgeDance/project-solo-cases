import React from 'react';
import { NavLink } from 'react-router-dom';

const CourtDataTableLink = () => {
  return (
    <NavLink 
      to="/dashboard/court-data" 
      style={({ isActive }) => ({ 
        color: isActive ? 'blue' : 'black',
        textDecoration: isActive ? 'underline' : 'none'
      })}
    >
      Court Data Table
    </NavLink>
  );
};

export default CourtDataTableLink;

