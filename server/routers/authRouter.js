import User from './../db/userModel.js';
import express from 'express';
import axios from 'axios';
import crypto from 'crypto';

import ckie from './../auth/controllers/cookieController.js';
import volt from './../auth/controllers/vaultController.js';
import usrC from './../auth/controllers/userController.js';
import crpt from '../auth/controllers/cryptController.js';
import jwt from './../auth/controllers/jwtController.js';
import sess from './../auth/controllers/sessionController.js';
import csrf from './../auth/controllers/csrfController.js';

const authRouter = express.Router();

authRouter.get('/test',
  (req, res, next)=>{ 
    res.json('works');
  }
)


authRouter.post('/', 
  volt.initReq,                 // init req.dataVault
  // crpt.decryptVault,            // (NEEDS a cookie)
  usrC.signin,
  crpt.encryptVault,
  ckie.ssidboxDispatch,
  (req, res) => {
    return res.redirect(307,`/auth/jwt`);
  }
); 

authRouter.post('/jwt', 
  crpt.decryptVault,
  jwt.generate,
  crpt.encryptVault,
  (req, res) => {
    return res.redirect(307,`/auth/sess`);
  }
);

authRouter.post('/sess', 
  crpt.decryptVault,
  crpt.encryptVault,
  ( req, res, next )=>{
    return res.redirect(307,`/auth/csrf`);
  },
);

authRouter.post('/csrf', 
  crpt.decryptVault,
  crpt.encryptVault,
  (req, res, next)=>{
    return res.redirect(307,`/auth/allDone`);
  },
);

authRouter.post('/allDone', 
  crpt.decryptVault,
  (req, res, next)=>{
    console.log('/allDone end', req.cookies)

    res.locals.response = res.locals.response || {};
    res.locals.response.token = res.locals.response.token || {};
    res.locals.response.token = req.dataVault.response.token;

    res.locals.response.user = res.locals.response.user || {};
    res.locals.response.user.id = res.locals.response.user.id || {};
    res.locals.response.user.id = req.dataVault.query._id;

    res.locals.response.user.username = res.locals.response.user.username || {};
    res.locals.response.user.username = req.dataVault.query.username;

    res.locals.response.user.roles = res.locals.response.user.roles || {};    
    res.locals.response.user.roles = req.dataVault.query.roles;

    const response =  res.locals.response 
    // if (req.dataVault && req.dataVault.entry === 'github') {
    //   return res.status(200).json({
    //     response,
    //     message: "Authentication successful",
    //     user: { username: req.dataVault.query.username, email: req.dataVault.query.email },
    //     redirectUrl: 'http://localhost:8080/close' // URL to redirect to close the popup window
    //   });
    // }
    return res.status(200).json( res.locals.response )
  },
);

authRouter.post('/logout', 
  ckie.Delete,
  ( req, res, next ) => {
    res.status(200).send('Logged out');
  }
)

authRouter.post('/github', 
  // volt.initReq,
  async (req, res, next) => {
    const { code, state } = req.body;
    console.log('CODECODECODECODE:::::::', code)
    // Validate the state parameter
    // TODO this needs to be double checked ...
    // if (state !== req.session.latestCSRFToken) {
    //     return res.status(403).send('State mismatch, possible CSRF attack.');
    // }

    try {
      // Exchange code for an access token
      req.dataVault.accessToken = await axios.post('https://github.com/login/oauth/access_token', {
        client_id: process.env.OAUTH_GITHUB_CLIENTID,
        client_secret: process.env.OAUTH_GITHUB_CLIENTSECRET,
        code,
        redirect_uri: `http://localhost:8080/callback`,
      }, {
        headers: { Accept: 'application/json' },
      }).data.access_token;;



      // Fetch the user's GitHub profile
      const userResponse = await axios.get('https://api.github.com/user', {
        headers: { Authorization: `token ${req.dataVault.accessToken}` },
      });

      const githubProfile = userResponse.data;

      // Attempt to find a user with the GitHub ID stored in oauthProviders
      let query = await User.findOne({ 'oauthProviders.github': githubProfile.id });

      if ( !query ) {
        const dummyPassword = crypto.randomBytes(16).toString('hex');
        
        const oauthData = {
          id: githubProfile.id,
          accessToken: accessToken, // Ensure this variable holds the GitHub access token
        };

        res.dataVault.user = await User.create({
          username: githubProfile.login,
          email: githubProfile.email,
          password: dummyPassword,
          oauthProviders: new Map([['github', JSON.stringify(oauthData)]]),
          profileImageUrl: githubProfile.avatar_url,
        });

        // To Access GitHub Token:
          // const githubData = JSON.parse(user.oauthProviders.get('github'));
          // const githubId = githubData.id;
          // const githubAccessToken = githubData.accessToken;
        // Note: Adjust the above fields according to your application's needs
      }

      // Log the user in (set session, generate JWT, etc.)
      // Redirect the user to the dashboard/home page


      req.dataVault = req.dataVault || {};
      req.dataVault.response = req.dataVault.response || {};
      req.dataVault.accessToken = req.dataVault.accessToken || {};
      req.dataVault.user = req.dataVault.user || {};
      req.dataVault.user._id = req.dataVault.user._id || {};
      req.dataVault.user.username = req.dataVault.user.username || {};
      req.dataVault.user.password = req.dataVault.user.password || {};
      req.dataVault.user.roles = req.dataVault.user.roles || [];
      req.dataVault.user.oauthProviders = req.dataVault.user.oauthProviders || [];




      req.dataVault = req.dataVault || {};
      req.dataVault.entry = 'github';
      req.dataVault.query = req.dataVault.query || {};
      req.dataVault.query = query;

      console.log("COOKIEauthRoute::", req.dataVault.query.cookieId, req.dataVault.query._id)
      return next();
    } catch (error) {
      console.error('Error during GitHub auth callback', error);
      res.status(500).send('Internal Server Error');
    }
  },
  ckie.ssidboxDispatch,
  crpt.encryptVault,
  (req, res, next)=>{
    res.redirect(307,`/auth/jwt`);
  }

);




export default authRouter;