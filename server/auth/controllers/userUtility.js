import User from './../../db/userModel.js';

async function handleLogin(username, password) {
  
  const query = await User.findOne({ username });
  if ( !query ) return { success: false, error: 'User does not exist', statusCode: 404 };

  const isMatch = await User.comparePasswords(password, query.password);
  if ( !isMatch ) return { success: false, error: 'User does not exist', statusCode: 404 };

  return { success: true, query };
}

async function handleSignup(username, password) {
  try {

    const query = await User.createNewUser({ username, password });
    return { success: true, query };

  } catch (error) {

    if (error.message === 'User already exists') {
      return { success: false, error: 'User already exists', statusCode: 409 };
    }

    throw error; 
  }
}

// Function to handle failed authentication attempts
export default {
  handleSignup,
  handleLogin,
};
