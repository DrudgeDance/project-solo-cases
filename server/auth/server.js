const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');

require('dotenv').config({ path: path.resolve(__dirname,'..', '.environment','.env') });


const userController = require('./controllers/userController');
const cookieController = require('./controllers/cookieController');
const sessionController = require('./controllers/sessionController');


const PORT = 3000;

const app = express();

const mongoURI = process.env.NODE_ENV === 'test' ? 'mongodb://localhost/unit11test' : 'mongodb://localhost/unit11dev';
mongoose.connect(mongoURI);


/**
* Automatically parse urlencoded body content and form data from incoming requests and place it
* in req.body
*/
app.use(express.json());
app.use(express.urlencoded());
app.use(cookieParser());
app.use('/client', express.static(path.resolve(__dirname, '../client')));


/**
* --- Express Routes ---
* Express will attempt to match these routes in the order they are declared here.
* If a route handler / middleware handles a request and sends a response without
* calling `next()`, then none of the route handlers after that route will run!
* This can be very useful for adding authorization to certain routes...
*/

/**
* root
*/
app.get('/', 
  cookieController.setCookie,
  (req, res) => {
    console.log("wtf")
    res.sendFile(path.resolve(__dirname, '../client/index.html'));
  }
);


/**
* signup
*/
app.get('/signup', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../client/signup.html'));
});

app.post('/signup', 
  userController.createUser , 
  cookieController.setSSIDCookie,  
  sessionController.startSession,                     // setSSID Cookie goes here
  sessionController.isLoggedIn,
  (req, res) => {
    // what should happen here on successful sign up?
    res.redirect('/secret');

  }
);


/**
* login
*/
app.post('/login', 
  userController.verifyUser, 
  cookieController.setSSIDCookie,
  sessionController.startSession,   
  sessionController.isLoggedIn,  // setSSID Cookie goes here
  (req, res) => {
  // what should happen here on successful log in?
    res.redirect('/secret');
  }
);


/**
* Authorized routes
*/
app.get('/secret',
  sessionController.isLoggedIn, 
  (req, res) => {
    res.sendFile(path.resolve(__dirname, '../client/secret.html'));
  }
 );

app.get('/secret/users', 
  sessionController.isLoggedIn, 
  userController.getAllUsers, 
  (req, res) => {
    res.send( { users: res.locals.users });
  }
)

/**
 * 404 handler
 */
app.use('*', (req,res) => {
  res.status(404).send('Not Found');
});

/**
 * Global error handler
 */
app.use((err, req, res, next) => {
  const defaultError = {
    log: 'Express error handler caught unknown middleware error',
    status: 500,
    message: {err: 'An error occured'},
  }

  // defaultError.log = err.log;
  // defaultError.message = err.message;

  //  (({} gets overwritten "defaultError")) gets overwritten by err
  const errorObj = Object.assign({}, defaultError, err)
  // {...defaultError}

  console.log(defaultError);
  console.log(err);
  console.log(errorObj);

  res.status(500).send({ error: err });
});


// const createErr = ({ method, type, err }) => {
//   // const { file, method, type, err } = errInfo;
//   return { 
//     log: `${file}.${method} ${type}: ERROR: ${typeof err === 'object' ? JSON.stringify(err) : err}`,
//     message: { err: `Error occurred in fileController.${method}. Check server logs for more details.` }
//   };
// };


//  next(createErr)
// createErr({
  //     file: 'sessionController'
//       method: 'isLoggedIn',
//       type: 'logged in error',
//       err,
//     })

app.listen(PORT, ()=>{ console.log(`Listening on port ${PORT}...`); });

module.exports = app;
