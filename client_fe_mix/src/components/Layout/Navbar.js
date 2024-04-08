
import React, { Suspense, lazy } from 'react';
import { NavLink } from 'react-router-dom';



// import PollersLink from './Navbar/link_Pollers.js';
// import CourtDataTableLink from './Navbar/link_CourtDataTable.js';
// import LogoutButton from './LogoutButton.js';

const Navbar = () => {
  const user = JSON.parse(localStorage.getItem('user')); // Assuming user info is stored in localStorage

  // Lazy load components with suspense fallback
  const loadComponent = (Component) => (props) => (
    <Suspense fallback={<div>Loading...</div>}>
      <Component {...props} />
    </Suspense>
  );

  const AdminLink = loadComponent(lazy(() => import('./Navbar/link_Admin.js')));
  const CourtDataTableLink = loadComponent(lazy(() => import('./Navbar/link_CourtDataTable.js')));
  const LogoutButton = loadComponent(lazy(() => import('./LogoutButton.js')));
  const CatLink = loadComponent(lazy(() => import('./Navbar/link_Cat.js')));
  const DogLink = loadComponent(lazy(() => import('./Navbar/link_Dog.js')));

  return (
    <nav>
      <div className="global-wrapper">
        <ul>
          {user && user.roles.includes('superadmin') && (
            <>
              <li><AdminLink /></li>
              <li><CourtDataTableLink /></li>
              <li><DogLink /></li>
              <li><CatLink /></li>
            </>
          )}
          {user && user.roles.includes('admin') && (
            <>
              <li><AdminLink /></li>
            </>
          )}
          {user && user.roles.includes('user') && (
            <> 
              <li><CourtDataTableLink /></li>
            </>         
          )}
          {user && user.roles.includes('dog') && (
            <> 
              <li><DogLink /></li>
            </>         
          )}
          {user && user.roles.includes('cat') && (
            <> 
              <li><CatLink /></li>
            </>         
          )}
          {user && (
            <>
              <li><LogoutButton /></li>
            </>  
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;