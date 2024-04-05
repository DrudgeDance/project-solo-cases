// HomepageLink.js
import React from 'react';
import { Link } from 'react-router-dom';

const HomepageLink = () => {
  return (
    <Link to="/home">Home</Link> // Assuming your home page route is "/"
  );
};

export default HomepageLink;