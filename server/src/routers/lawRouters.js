import express from 'express';
import routerPTAB from './routerPTAB.js';
import routerCFAC from './routerCFAC.js';
import routerITC from './routerITC.js';
import routerSC from './routerSC.js';

const lawRouter = express.Router();


lawRouter.get('/', (req, res) => {
  res.send('Law route');
});

lawRouter.use('/PTAB', routerPTAB);
lawRouter.use('/CFAC', routerCFAC);
lawRouter.use('/ITC', routerITC);
lawRouter.use('/SC', routerSC);

export default lawRouter;