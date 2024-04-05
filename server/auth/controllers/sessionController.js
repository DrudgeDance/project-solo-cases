
import Session from './../../db/sessionModel.js'; // Adjust the import path as necessary
import generateSessionId from './sessionIdGenerator.js'; // Utility for generating session IDs
import errorHandler from './../handlers/errorHandler.js';

const sessionController = {


  isLoggedIn: async (req, res, next) => {
    console.log (`==Controller [isLoggedIn]  :  Checking if logged in ... `);

    if ( req.session && req.session.cookieId ) {
      try {
        const session = await Session.findOne({ cookieId: req.session.cookieId });
      } catch (err){
        console.log(err)
      }

      if ( session ) {
        req.sessionData = session;
        return next();
      }
    }
    console.log('skippy')
    // Optionally, renew the session if a JWT is provided and valid (not shown here)
    next('route'); // Proceed to attempt starting a new session if necessary
  },


  startSession: async (req, res, next) => {
    console.log (`==Controller [isLoggedIn]  :  New session if none exists ... `);

    if (!req.sessionData) {
      req.session.cookieId = generateSessionId();
      const newSession = await Session.create({ cookieId: req.session.cookieId });
      req.sessionData = newSession;
    }
    next();
  },
  appendSession: (req, res, next) => {
    // Additional session manipulations can go here
    next();
  }


};

export default sessionController;