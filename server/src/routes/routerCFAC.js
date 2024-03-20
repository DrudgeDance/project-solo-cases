import express from 'express';

const routerCFAC = express.Router();

routerCFAC.get('/', (req, res) => {
  res.send('CFAC route');
});

export default routerCFAC;