import express from 'express';

const routerPTAB = express.Router();

routerPTAB.get('/', (req, res) => {
  res.send('PTAB route');
});

export default routerPTAB;