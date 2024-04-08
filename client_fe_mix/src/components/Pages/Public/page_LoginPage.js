import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../../../redux/slices/authSlice.js';
import { useNavigate, Link } from 'react-router-dom';
// import GoogleOAuth from '../OAuth/oauth_Google.js'
// import MicrosoftOAuth from '../OAuth/oauth_Microsoft.js'; // Import the Microsoft OAuth component
import GithubOAuth from '../OAuth/oauth_Github.js'; 

function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Access the authentication status from the Redux state
  const { isAuthenticated } = useSelector(state => state.auth);

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/dashboard'); // Adjust the target path as needed
    }
  }, [isAuthenticated, navigate]);

  const handleGithubSignIn = (githubUser) => {
    console.log("GitHub User Info:", githubUser);

    // Handle the GitHub sign in, similar to other OAuth providers
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // No need to try-catch here, as we're not doing anything with the Promise returned by dispatch
    dispatch(login({ username, password }));
  };

  // const handleGoogleSignIn = (googleUser) => {
  //   // Here you can extract the ID token and send it to your backend
  //   const id_token = googleUser.getAuthResponse().id_token;
  //   console.log("Google ID Token:", id_token);
  //   // Dispatch to your auth handler or Redux action
  // };

  // const handleMicrosoftSignIn = (accountInfo) => {
  //   // Handle the Microsoft account information similar to how you handle Google's
  //   console.log("Microsoft Account Info:", accountInfo);
  //   // You might want to dispatch something similar to your Redux store or perform API calls
  // };
   

  return (
    <div className="login-page-outerWrapper"> {/* Wrapper added here */}
      <div className="login-page-middleWrapper">
        <div className="login-page-innerWrapper">
          <form onSubmit={handleSubmit}  className="login-form">
            <input
              className="login-form-username"
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <input
              className ="login-form-password"
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <button type="submit">Login</button>
          </form>
         <div className="login-oauth">
                      <p>Don't have an account? <Link to="/signup">Sign up here</Link></p>
        <GithubOAuth onSignIn={handleGithubSignIn} className="github-button" />
  
            {/* <MicrosoftOAuth onSignIn={handleMicrosoftSignIn} />
          <br></br>
            <GoogleOAuth onSignIn={handleGoogleSignIn} />
          <br></br> */}
            </div>

        </div>
      </div>
    </div>
  );
}

export default LoginPage;