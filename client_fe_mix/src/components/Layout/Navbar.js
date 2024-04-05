/*** <Link> vs <NavLink>

(1) Active Styling: The main difference is that <NavLink> can automatically apply an active class or style based on the current route, which <Link> cannot do.

(2) Props for Active State: <NavLink> supports additional props for managing the active state (activeClassName, activeStyle, exact, isActive), providing greater control over the appearance of navigation links.

Use Cases: Use <Link> for generic navigation that doesn't require active styling. Use <NavLink> for components like navigation bars or breadcrumbs where indicating the current page or section is beneficial.

Conclusion:  <NavLink> offers extended functionality for cases where visual feedback on navigation state is needed.


    <nav>
      <Link to="/home">Home</Link>
      <Link to="/about">About</Link>
      <Link to="/contact">Contact</Link>
    </nav>

    **** VERSUS ****

    <nav>
      <NavLink to="/home" activeClassName="active">Home</NavLink>
      <NavLink to="/about" activeClassName="active">About</NavLink>
      <NavLink to="/contact" activeClassName="active">Contact</NavLink>
    </nav>

    && CSS

    .active {
      color: red;
      font-weight: bold;
    }

***/





import React, { Suspense, lazy } from 'react';



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

  const PollersLink = loadComponent(lazy(() => import('./Navbar/link_Pollers.js')));
  const CourtDataTableLink = loadComponent(lazy(() => import('./Navbar/link_CourtDataTable.js')));
  const LogoutButton = loadComponent(lazy(() => import('./LogoutButton.js')));

  return (
    <nav>
      <ul>
        {user && user.roles.includes('admin') && (
          <>
            <li><PollersLink /></li>
          </>
        )}
        {user && user.roles.includes('user') && (
          <> 
            <li><CourtDataTableLink /></li>
          </>         
        )}
        {user && (
          <>
            <li><LogoutButton /></li>
          </>  
        )}
      </ul>
    </nav>
  );
};

export default Navbar;