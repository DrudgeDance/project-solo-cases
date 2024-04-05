import React, { useEffect } from 'react';

const GoogleSignInButton = ({ onSignIn }) => {
  useEffect(() => {
    // Dynamically load the Google Platform Library
    const script = document.createElement('script');
    script.src = 'https://apis.google.com/js/platform.js';
    script.onload = () => initGoogleSignIn();
    document.body.appendChild(script);

    return () => {
      // Cleanup the script when the component unmounts
      document.body.removeChild(script);
    };
  }, []);

  const initGoogleSignIn = () => {
    window.gapi.load('auth2', () => {
      if (!window.gapi.auth2.getAuthInstance()) {
        window.gapi.auth2.init({
          client_id: 'YOUR_CLIENT_ID.apps.googleusercontent.com',
          // Specify the scopes and other options if necessary
        });
      }
    });
  };

  const handleGoogleSignIn = () => {
    const auth2 = window.gapi.auth2.getAuthInstance();
    auth2.signIn().then(googleUser => {
      // Invoke the callback with the signed-in user's information
      onSignIn(googleUser);
    }, error => {
      console.error("Error signing in with Google:", error);
    });
  };

  return (
    <button onClick={handleGoogleSignIn}>Sign in with Google</button>
  );
};

export default GoogleSignInButton;
