import express from 'express';

import sess from './../auth/controllers/sessionController.js';
import ckie from './../auth/controllers/cookieController.js';
import user from './../auth/controllers/userController.js';
import jwt from './../auth/controllers/jwtController.js';
import csrf from './../auth/controllers/csrfController.js';
import crpt from '../auth/controllers/cryptController.js';
// const userController = require('./controllers/userController');
// const cookieController = require('./controllers/cookieController');
// const sessionController = require('./controllers/sessionController');



const authRouter = express.Router();

authRouter.post('/', 
  (req, res, next) =>{
    console.log('/auth/ start')
    return next();
  },
  user.signin,
  crpt.encryptVault,
  ckie.ssidboxDispatch,
  (req, res) => {
    console.log('/auth/ end')
    return res.redirect(307,`/auth/jwt`);
  }
); 

authRouter.post('/jwt', 
  (req, res, next)=>{
    console.log('/JWT start', req.cookies)
    return next();
  },
  crpt.decryptVault,
  jwt.generate,
  crpt.encryptVault,
  (req, res) => {
    console.log('/JWT end')
    return res.redirect(307,`/auth/sess`);
  }
);

authRouter.post('/sess', 
  ( req, res, next )=>{
    console.log('/SESS start', req.cookies)
    console.log('req.cookies', req.cookies)
    return next();
  },
  crpt.decryptVault,

  crpt.encryptVault,
  ( req, res, next )=>{
    console.log('/SESS end', req.cookies)

    return res.redirect(307,`/auth/csrf`);
  },
);

authRouter.post('/csrf', 
  (req, res, next)=>{
    console.log('/CSRF start', req.cookies)
    console.log('req.cookies', req.cookies)
    return next();
  },
  crpt.decryptVault,

  crpt.encryptVault,
  (req, res, next)=>{
    console.log('/CSRF end', req.cookies)
    console.log('req.cookies', req.cookies)
    return res.redirect(307,`/auth/allDone`);
  },
);

authRouter.post('/allDone', 
  ( req, res, next )=>{
    console.log('/allDone start', req.cookies)    
    return next();
  },
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

    return res.status(200).json( res.locals.response )
  },
);


authRouter.post('/logout', 
  ckie.Delete,
  ( req, res, next )=>{
    console.log("Logging out attempt ...")
    res.status(200).send('Logged out');
  }
)








//       //     "id": "user123",
//       //     "username": "userexample",
//       //     "roles": ["user"],
//   (req, res) => {
//     return res.redirect(307,`/auth/sess`);
//   }
// );

// authRouter.post('/csrf', 
//   (req, res, next)=>{
//     console.log('req.cookies', req.cookies)
//     return next();
//   },

//   (req, res) => {
//     return res.status(200).json('DATA GOES HERE');
//   }
// );


















// authRouter.post('/login', 
//   (req, res) => {
//     console.log('lolololo', req.body)
//     res.status(200).json(
//      {
//       "user": {
//         "id": "admin456",
//         "username": "adminexample",
//         "roles": ["admin"],
//         "email": "admin@example.com"
//       },
//       "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJhZG1pbjQ1NiIsInJvbGVzIjpbImFkbWluIl0sImlhdCI6MTUxNjIzOTAyMn0.def456"
//     }
    
//       // {
//       //   "user": {
//       //     "id": "user123",
//       //     "username": "userexample",
//       //     "roles": ["user"],
//       //     "email": "user@example.com"
//       //   },
//       //   "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJ1c2VyMTIzIiwicm9sZXMiOlsidXNlciJdLCJpYXQiOjE1MTYyMzkwMjJ9.abc123"
//       // }
//     )
//   }

// );

// authRouter.post('/signup', 
  // (req, res, next) => {

  //   const { username, password } = req.body;
  //   console.log(`=======================================================`)
  //   console.log(`=======================================================`)
  //   console.log(`SIGNUP STARTED:  [username]: ${username}`)
  //   console.log(`                 [password]: ${password}`)
  //   console.log(`                 `)
  //   return next();
  // },
  // user.createUser,
  // jwt.generate,
  // ckie.setSSIDCookie,

  // sess.isLoggedIn, 
  // sess.startSession,
  // csrf.checkCsrfExpiration,
  // csrf.generateCsrf,
  // csrf.updateCsrf,

  // (req, res) => {
  //   // what should happen here on successful sign up?
  //   console.log( res.locals.response )
  //   console.log(`=======================================================`)
  //   console.log(`=======================================================`)
  //   res.json({
  //     message: "Action processed successfully.",
  //     csrfToken: req.sessionData.csrfToken
  //   });
  // }
// );

// authRouter.post('/refresh', 
//   (req, res) => {
//     // what should happen here on successful sign up?

//     res.json({ message: 'Hit Refresh Endpoint' });

//   }
// )

// authRouter.post('/csrf-token', 
//   (req, res) => {
//     // what should happen here on successful sign up?
//     res.json({ message: 'Hit CSRF-Token Endpoint' });

//   }
// )

// authRouter.post('/:OAuth/callback', 
//   ( req, res, next ) => {  

//     // google
//     // github
//     // apple
//     // microsoft

//     // what should happen here on successful sign up?
//     res.json({ message: 'Hit CSRF-Token Endpoint' });

//   }
// )

export default authRouter;