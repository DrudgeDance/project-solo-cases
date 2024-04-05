import Session from './../../db/sessionModel.js';
import crypto from 'crypto';

import { generateCsrfToken, csrfTokenExpires } from './csrfTokenGenerator.js'; // CSRF utility functions

const csrfController = {


  generateCsrf: (req, res, next) => {
    console.log (`==Controller [checkCsrfExpiration]  :  Directly generate a CSRF token without checking for expiration ... `);
  
    req.sessionData.csrfToken = generateCsrfToken();
    req.sessionData.csrfExpires = csrfTokenExpires();
    next();
  },


  checkCsrfExpiration: (req, res, next) => {
    console.log (`==Controller [checkCsrfExpiration]  :  Check if CSRF token has expired ... `);
    
    if (new Date() > req.sessionData.csrfExpires) {
      next(); // Token expired; proceed to generate a new one
    } else {
      next('route'); // Token is valid; skip to the next route
    }
  },


  updateCsrf: async (req, res, next) => {
    console.log (`==Controller [checkCsrfExpiration]  :  Save any updates to the CSRF token in the session ... `);

    await req.sessionData.save();
    next();
  },


};

export default csrfController;
