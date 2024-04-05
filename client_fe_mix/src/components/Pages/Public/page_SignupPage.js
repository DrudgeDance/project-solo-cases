import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { signup } from '../../../redux/slices/authSlice.js'; // Adjust the import path according to your project structure
import { useNavigate } from 'react-router-dom';

function SignupPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await dispatch(signup({ username, password }));
      navigate('/dashboard'); // Adjust the route as necessary
    } catch (error) {
      console.error('Signup failed', error);
      // Handle the error (e.g., display an error message)
    }
  };

  return (
    <div>
      <h2>Sign Up</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Sign Up</button>
      </form>
      <p>Already have an account? <a href="/">Login here</a></p>
    </div>
  );
}

export default SignupPage;
