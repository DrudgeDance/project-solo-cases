// oauth_githubCallback.js
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { githubLogin } from '../../../redux/slices/authSlice.js'; // Adjust the import path as needed

const GithubOAuthCallback = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get('code');
    const state = urlParams.get('state');
    console.log(":::CODE/STATE:::", code, state)

    if (code && state === localStorage.getItem("latestCSRFToken")) {
      dispatch(githubLogin({ code, state }))
        .unwrap()
        .then(() => navigate('/dashboard'))
        .catch(() => navigate('/'));
    } else {
      console.error('State mismatch or missing code');
      navigate('/');
    }
  }, [navigate, dispatch]);

  return <div>Processing GitHub login...</div>;
};

export default GithubOAuthCallback;
