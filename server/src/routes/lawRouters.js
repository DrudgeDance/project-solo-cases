import express from 'express';
import routerPTAB from './routerPTAB.js';
import routerCFAC from './routerCFAC.js';
import routerITC from './routerITC.js';
import routerSC from './routerSC.js';

const lawRouters = express.Router();


lawRouters.get('/', (req, res) => {
  res.send('Law route');
});

lawRouters.use('/PTAB', routerPTAB);
lawRouters.use('/CFAC', routerCFAC);
lawRouters.use('/ITC', routerITC);
lawRouters.use('/SC', routerSC);

export default lawRouters;