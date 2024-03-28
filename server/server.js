import config from './src/_configs/config.core.js';

import express from 'express';
import path from 'path';

import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { fork } from 'child_process';

import lawRouters from './src/fe_api/court/fe_routes/lawRouters.js';
import database from './src/fe_db/db.js';

const app = express();


const PORT = config.port;
const IP = config.IP;

database.connectDB().catch(console.error);


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
    .send('testresponse');
});

app.listen(PORT,  IP, () => {
  console.log(`${config.curr} Server is running at http://${config.IP || 'localhost'}:${PORT}`);

  const scraperPath = path.join(__dirname, 'src/srvc_dataScrape/dataScrapers/scraper.js');

  const scraperProcess = fork(scraperPath);

  scraperProcess.on('message', (message) => {
    console.log(`Message from scraper: ${message}`);
  });

});