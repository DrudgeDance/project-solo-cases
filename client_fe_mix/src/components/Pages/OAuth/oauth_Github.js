// oauth_Github.js
import React from 'react';

const GithubOAuth = ({ onSignIn, className }) => {
  const handleLogin = () => {
    // Generate a CSRF token and store it
    const state = Array.from(crypto.getRandomValues(new Uint8Array(16)))
                        .map(b => b.toString(16))
                        .join("");
    localStorage.setItem("latestCSRFToken", state);
    
    // BAD // HARDCODED (Client ID)
    const client_id = "3e3e37ed1828ba52627d"; // Replace with your GitHub Client ID
    const scope = "repo";
    const redirect_uri = `${window.location.origin}/callback`; // Make sure this matches the registered URI
    const url = `https://github.com/login/oauth/authorize?client_id=${client_id}&response_type=code&scope=${scope}&redirect_uri=${redirect_uri}&state=${state}`;
    
    // Open GitHub OAuth in a new window
    window.location.href = url;
    
  };

  return (
          <button onClick={handleLogin} className={className}>
            Sign in with GitHub
          </button>
        );
};

export default GithubOAuth;
