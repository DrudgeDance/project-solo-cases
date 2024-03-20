import express from 'express';

const routerITC = express.Router();

routerITC.get('/', (req, res) => {
  res.send('ITC route');
});

export default routerITC;