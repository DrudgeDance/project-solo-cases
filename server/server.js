import express from 'express';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import lawRouters from './src/routes/lawRouters.js';
import database from './src/db_mongo/db.js';
import { fork } from 'child_process';

const app = express();

const port = process.env.port || 3000;

database.connectDB().catch(console.error);

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const scraperProcess = fork(join(__dirname, './src/helperCaseScrape/scrapeSC.js'));

scraperProcess.on('message', (message) => {
  console.log(`Message from scraper: ${message}`);
});

// Handle errors in the scraper process
scraperProcess.on('error', (error) => {
  console.error(`Error in scraper process: ${error}`);
});

// Handle the scraper process exiting
scraperProcess.on('exit', (code, signal) => {
  console.log(`Scraper process exited with code ${code} and signal ${signal}`);
});

app.use('/law', lawRouters);

app.get('/', (req, res) => {
  res
    .status(200)
    .send('testresponse');
});

app.listen(port, process.env.IP, () => {
  console.log(`Server is running at http://${process.env.IP || 'localhost'}:${port}`);
});

