const login = async (userCredentials) => {
  // Placeholder: Replace with your actual API call
  const response = await fetch('/auth/?signin=login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(userCredentials),
    redirect: 'follow',
  });
  if (!response.ok) {
    throw new Error('Failed to login');
  }
  const data = await response.json();
  // Assuming 'data' contains 'user' and 'token' properties
  
  // Store user details and token in local storage
  localStorage.setItem('user', JSON.stringify(data.user));
  localStorage.setItem('token', data.token);
  
  return data.user; // or return { user: data.user, token: data.token } depending on your needs
};

const logout = async () => {
  try {
    // Clear user details and token from local storage
    localStorage.removeItem('user');
    localStorage.removeItem('token');
  
    // Send a request to the server to clear the HTTP-only cookies
    const response = await fetch('/auth/logout', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include', // Necessary for cookies to be included in the request
    });
  
    if (!response.ok) {
      throw new Error('Failed to logout');
    }
  
    // Handle post-logout logic here, e.g., redirecting the user
    console.log('Logged out successfully');
    // For instance, redirect to the login page:
    // window.location.href = '/login';
  } catch (error) {
    console.error('Logout error:', error);
  }

};

const signup = async (userData) => {
  const response = await fetch('/auth/?signin=signup', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(userData),
    redirect: 'follow',
  });
  if (!response.ok) {
    throw new Error('Failed to signup');
  }
  const data = await response.json();

  // Optionally store user details and token in local storage
  localStorage.setItem('user', JSON.stringify(data.user));
  localStorage.setItem('token', data.token);

  return data.user; // or return { user: data.user, token: data.token } depending on your needs
};

const authService = { login, logout, signup };

export default authService;
