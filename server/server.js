import cookieParser from 'cookie-parser';
import express from 'express';

import config from './src/_configs/config.core.js';
import path, { dirname, join } from 'path';
import { fileURLToPath } from 'url';
// import { fork } from 'child_process';

import apiRouter from './routers/apiRouter.js'
import authRouter from './routers/authRouter.js';
import lawRouters from './src/fe_api/court/fe_routes/lawRouters.js';

import { connectDB, disconnectDB } from './db/database.js'
// import database from './src/OLD_WTF/db.js';
connectDB();

const app = express();
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

app.get('/', (req, res) => {
  res
    .status(200)
    .send('testresponse5425215');
});

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


app.get(`/api/myapi`, 
  (req,res,next)=>{
    if(true) return next('route')
    return next();
  },
  (req, res)=>{

    return res.status(200).json('send this')
  }
)

app.get(`/api/myapi`, 
  (req, res)=>{

    return res.status(200).json('nope, we sending this')
  }
)