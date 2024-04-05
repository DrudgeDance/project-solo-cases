import jwt from 'jsonwebtoken';


const jwtController = {};

jwtController.generate = (req, res, next) => {
 
  if ( req.dataVault ) {
    console.log (`==Controller [jwt]     :  Generating a JSON Web Token ... `);

    const { username, _id: userId } = req.dataVault.query;

    const token = jwt.sign(
      { username, userId }, 
      `${process.env.JWT_SECRET_KEY}`, 
      { expiresIn: '1h' }
    );

    console.log("TOKEN:  ", token)

    req.dataVault.response = req.dataVault.response || {};
    req.dataVault.response.token = token;

    next(); 
  } else {
      // If `req.user` is not set, authentication failed
      res.status(401).send('Authentication failed');
  }
};

export default jwtController;