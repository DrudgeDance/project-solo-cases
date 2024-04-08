import user from './userUtility.js';
import errorHandler from './../handlers/errorHandler.js';

const userController = {};

userController.signin = async (req, res, next) => {
  const { username, password } = req.body;
  const { signin } = req.query; 

  console.log("SIGNIN::", signin)

  if (!username || !password) {
    return res.status(400).send('Username and password are required');
  }

  try {
    let result = '';

    if ( signin === 'login' ) {

      try{
        result = await user.handleLogin(username, password);
      } catch (err){
        console.log(err)
      }

      if ( !result.success ) {
        return res.status( result.statusCode ).send( result.error );
      }
    } else if ( signin === 'signup' ) {
      console.log("SIGNUP!!!")
      result = await user.handleSignup(username, password);
      if ( !result.success ) {
        return res.status( result.statusCode ).send( result.error );
      }
    } else {
      return res.status( 404 ).send( 'Invalid resource request' );      
    }

    req.dataVault = req.dataVault || {};
    req.dataVault.entry = signin;
    req.dataVault.query = result.query;

    return next();
  } catch (error) {

    next(errorHandler.createErr({
      file: 'userController',
      method: signin === 'login' ? 'login' : 'signup',
      type: 'Problem processing request',
      err: error,
    }));
  };
}

export default userController;