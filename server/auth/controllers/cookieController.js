import errorHandler from './../handlers/errorHandler.js';
import crypto from 'crypto';

const cookieController = {};
  console.log('hello')
  cookieController.ssidboxDispatch = async (req, res, next) => {
    console.log('==Controller [cookie] : Generating a cookie ...');

    const hasCookieVaultDetails = req.dataVault && req.dataVault.entry && req.dataVault.query;
    
    if ( hasCookieVaultDetails ) {
      const { cookieId } = req.dataVault.query;
      console.log(cookieId);
      res.cookie('ssid', cookieId, { httpOnly: true, sameSite: 'Strict' });
      return next();
    } 

    res.status(400).send("Cookie can't be set without user identification.");
  };

  cookieController.Delete = async (req, res, next) => {

    res.cookie('ssid', '', { expires: new Date(0), path: '/' });

    return next();
  };


export default cookieController;
