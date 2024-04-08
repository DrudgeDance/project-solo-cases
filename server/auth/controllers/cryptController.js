import TemporaryKey from '../../db/redirect_keyModel.js'; // Adjust the path as necessary
import EncryptedData from '../../db/redirect_dataModel.js';
import crypto, { createCipheriv, randomBytes, createDecipheriv } from 'crypto';

const cryptController = {};

cryptController.encryptVault = async (req, res, next) => {
  if (!req.dataVault || !req.dataVault.query || !req.dataVault.query._id) {
    return next(new Error('Invalid request for encryption'));
  }

  try {
    const { _id } = req.dataVault.query;
    const userId = _id; 

    const tempKey = await TemporaryKey.create({ userId });

    const dataToEncrypt = JSON.stringify(req.dataVault); 
    const key = Buffer.from(tempKey.encryptionKey, 'hex'); 
    const iv = randomBytes(16); 

    const cipher = createCipheriv('aes-256-cbc', key, iv);

    let encryptedData = cipher.update(dataToEncrypt, 'utf8', 'hex');
    encryptedData += cipher.final('hex');


    await EncryptedData.create({
      userId, 
      encryptedData,
      iv: iv.toString('hex'),
    });
    console.log("'==Controller [encrypt] : Encryption successfull ...'")
    return next();

  } catch (error) {
    return next(error);
  }
};


cryptController.decryptVault = async (req, res, next) => {
  const userId = req.cookies['ssid']; 
  console.log("SSSSSSIIIDDDDCOOOKIIIEEE:", userId)

  if ( !userId ) {
    return next(new Error(`Invalid request for decryption: SSID cookie not found`));
  }

  try {
    const tempKey = await TemporaryKey.findOne({ userId }).sort({ createdAt: -1 });
    const encryptedRecord = await EncryptedData.findOne({ userId }).sort({ createdAt: -1 });

    if (!tempKey || !encryptedRecord) {
      throw new Error(`No encryption record found for this user`);
    }

    const encryptedData = encryptedRecord.encryptedData;
    const iv = Buffer.from(encryptedRecord.iv, 'hex');
    const key = Buffer.from(tempKey.encryptionKey, 'hex');

    const decipher = createDecipheriv('aes-256-cbc', key, iv);
    let decryptedData = decipher.update(encryptedData, 'hex', 'utf8');
    decryptedData += decipher.final('utf8');

    req.dataVault = req.dataVault || {};
    req.dataVault = JSON.parse(decryptedData);

    console.log('==Controller [decrypt] : Decryption successful ...')
    console.log(JSON.parse(decryptedData))
    return next();

  } catch (error) {
    return next(error);
  }
};

export default cryptController;

