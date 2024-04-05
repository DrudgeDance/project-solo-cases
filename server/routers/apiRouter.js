import express from 'express';

const apiRouter = express.Router();

apiRouter.get('/', 
  (req, res) => {
    res.json({ message: 'Welcome to the API!' });
  }
);

apiRouter.post('/anotherTest', 
  (req, res) => {
    res.json({ message: 'Data received' });
  }
);

export default apiRouter;