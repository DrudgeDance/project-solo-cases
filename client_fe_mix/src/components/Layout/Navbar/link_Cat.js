import React from 'react';
import { NavLink } from 'react-router-dom';

const CatLink = () => {
  return (
    <NavLink 
      to="/dashboard/cat" 
      className={({ isActive }) => isActive ? "nav-link selected" : "nav-link"}
    >
      Cat Page
    </NavLink>
  );
};

export default CatLink;

