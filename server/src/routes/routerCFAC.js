import express from 'express';

const routerCAFC = express.Router();

routerCAFC.get('/', (req, res) => {
  res.send('CAFC route');
});

export default routerCAFC;