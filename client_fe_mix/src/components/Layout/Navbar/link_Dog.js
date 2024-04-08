import React from 'react';
import { NavLink } from 'react-router-dom';

const DogLink = () => {
  return (
    <NavLink 
      to="/dashboard/dog" 
      className={({ isActive }) => isActive ? "nav-link selected" : "nav-link"}
 
    >
      Dog Page
    </NavLink>
  );
};

export default DogLink;

