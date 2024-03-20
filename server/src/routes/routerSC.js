import express from 'express';

const routerSC = express.Router();

routerSC.get('/', (req, res) => {
  res.send('SC route');
});

export default routerSC;