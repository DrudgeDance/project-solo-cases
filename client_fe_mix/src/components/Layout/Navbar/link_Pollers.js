import React from 'react';
import { NavLink } from 'react-router-dom';

const PollersLink = () => {
  return (
    <NavLink 
      to="/dashboard/pollers" 
      style={({ isActive }) => ({ 
        color: isActive ? 'blue' : 'black',
        textDecoration: isActive ? 'underline' : 'none'
      })}
    >
      Pollers
    </NavLink>
  );
};

export default PollersLink;
