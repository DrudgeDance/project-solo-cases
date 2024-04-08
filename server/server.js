import cookieParser from 'cookie-parser';
import express from 'express';
import cors from 'cors';
import config from './src/_configs/config.core.js';
import path, { dirname, join } from 'path';
import { fileURLToPath } from 'url';
// import { fork } from 'child_process';
import ckie from './auth/controllers/cookieController.js'
import crpt from './auth/controllers/cryptController.js';


import apiRouter from './routers/apiRouter.js'
import authRouter from './routers/authRouter.js';
import lawRouters from './src/fe_api/court/fe_routes/lawRouters.js';

import { connectDB, disconnectDB } from './db/database.js'
// import database from './src/OLD_WTF/db.js';
connectDB();

const app = express();
app.use(cors()); // This opens up CORS for all origins. Be more specific for production!

app.use(express.json());
app.use(cookieParser());

app.use('/api', apiRouter);
app.use('/auth', authRouter);

const PORT = config.PORT;
const IP = config.IP;

// database.connectDB().catch(console.error);

const __dirname = dirname(fileURLToPath(import.meta.url));
/**
 * 
 * 
 * API PROCESS BELOW
 * 
 * 
 */

app.use('/law', lawRouters);

app.use(express.static(path.join(__dirname, '..', `build_${process.env.NODE_ENV}`)));
app.get('*', (req, res) => {
  
  res.sendFile(path.join(__dirname, '..', `build_${process.env.NODE_ENV}`, 'index.html'));
});



app.get('/', (req, res) => {
  res
    .status(200)
    .send('testresponse5425215');
});



// authRouter.post('/callback', 
//   async (req, res, next) => {
//     const { code } = req.query;
//     console.log('CODECODECODECODE:::::::', code)
//     // Validate the state parameter
//     // if (state !== req.session.latestCSRFToken) {
//     //     return res.status(403).send('State mismatch, possible CSRF attack.');
//     // }

//     try {
//       // Exchange code for an access token
//       const tokenResponse = await axios.post('https://github.com/login/oauth/access_token', {
//         client_id: process.env.OAUTH_GITHUB_CLIENTID,
//         client_secret: process.env.OAUTH_GITHUB_CLIENTSECRET,
//         code,
//         redirect_uri: `http://localhost:8080/auth/github`,
//       }, {
//         headers: { Accept: 'application/json' },
//       });

//       const accessToken = tokenResponse.data.access_token;

//       // Fetch the user's GitHub profile
//       const userResponse = await axios.get('https://api.github.com/user', {
//         headers: { Authorization: `token ${accessToken}` },
//       });

//       const githubProfile = userResponse.data;

//       // Attempt to find a user with the GitHub ID stored in oauthProviders
//       let query = await User.findOne({ 'oauthProviders.github': githubProfile.id });

//       if ( !query ) {
//         const dummyPassword = crypto.randomBytes(16).toString('hex');
        
//         const oauthData = {
//           id: githubProfile.id,
//           accessToken: accessToken, // Ensure this variable holds the GitHub access token
//         };

//         query = await User.create({
//           username: githubProfile.login,
//           email: githubProfile.email,
//           password: dummyPassword,
//           oauthProviders: new Map([['github', JSON.stringify(oauthData)]]),
//           profileImageUrl: githubProfile.avatar_url,
//         });

//         // To Access GitHub Token:
//           // const githubData = JSON.parse(user.oauthProviders.get('github'));
//           // const githubId = githubData.id;
//           // const githubAccessToken = githubData.accessToken;
//         // Note: Adjust the above fields according to your application's needs
//       }

//       // Log the user in (set session, generate JWT, etc.)
//       // Redirect the user to the dashboard/home page

//       req.dataVault = req.dataVault || {};
//       req.dataVault.entry = 'github';
//       req.dataVault.query = req.dataVault.query || {};
//       req.dataVault.query = query;

//       console.log("COOKIEauthRoute::", req.dataVault.query.cookieId, req.dataVault.query._id)
//       return next();
//     } catch (error) {
//       console.error('Error during GitHub auth callback', error);
//       res.status(500).send('Internal Server Error');
//     }
//   },
//   ckie.ssidboxDispatch,
//   crpt.encryptVault,
//   (req, res, next)=>{
//     res.redirect(307,`/auth/jwt`);
//   }

// );
const server = app.listen(PORT,  IP, () => {
  console.log(`${config.curr} Server is running at http://${config.IP || 'localhost'}:${PORT}`);

  // const scraperPath = path.join(__dirname, 'src/srvc_dataScrape/dataScrapers/scraper.js');
  // const scraperProcess = fork(scraperPath);

  // scraperProcess.on('message', (message) => {
  //   console.log(`Message from scraper: ${message}`);
  // });

});

const gracefulShutdown = () => {
  server.close(async () => {
    console.log('Server shut down gracefully');
    await disconnectDB(); // Disconnect from MongoDB
    process.exit(0);
  });
};

process.on('SIGTERM', gracefulShutdown);
process.on('SIGINT', gracefulShutdown);