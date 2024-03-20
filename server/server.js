import express from 'express';
import lawRouters from './src/routes/lawRouters.js';

const app = express();
const port = process.env.port || 3000;

app.get('/', (req, res) => {
  res
    .status(200)
    .send('testresponse');
});

app.use('/law', lawRouters);

app.listen(port, process.env.IP, () => {
  console.log(`Server is running at http://${process.env.IP || 'localhost'}:${port}`);
});