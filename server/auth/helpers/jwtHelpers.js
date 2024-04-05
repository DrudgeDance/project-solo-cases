import path from 'path';

import User from '../../db/userModel.js';
import errorHandler from './../handlers/errorHandler.js';

import jwtoken from'jsonwebtoken';
import util from 'util';

const jwt = {};

// Asynchronous Callback Promisified
const verifyAsync = util.promisify(jwtoken.verify);

// No Callback Wrapped in a promise == Made into a promise
function signAsync(payload, secretOrPrivateKey, options = {}){
  return new Promise((resolve, reject) => {
    jwt.sign(payload, secretOrPrivateKey, options, (err,token)=>{
      if(err){
        reject(err);
      } else { 
        resolve(token);
      }
    });
  });
}

const SECRET = process.env.JWT_SECRET_KEY;

jwt.testFunction = (data) => {
  console.log("data", data);
  return data;
}

jwt.genToken = async (user) => {

  try {
    console.log('Generating token')

    const payload = {
      username: user.username,
    }; 

    // const secret = 'your-secret-key';
    const options = { 
      expiresIn: '1h' 
    };

    const token = await signAsync(payload, SECRET, options)
    return token;

  } catch (err){
    return next( errorHandler.createErr({
      file: 'jwt',
      method: 'genToken',
      type: 'Problem generating a token!',
      // err,
    }) )
  }
};

jwt.verifyToken = async (token) => {
  // const secret = 'your-secret-key';

  try{
    const decoded = await verifyAsync(token, SECRET);
    return {success: true, data: decoded};
  } catch (err){
    return next(errorHandler.createErr({
      file: 'jwt',
      method: 'verifyToken',
      type: 'Problem verifying a token!',
      // err,
    }))
    //return {success: false, error: err.message };
  };
};


export default jwt;