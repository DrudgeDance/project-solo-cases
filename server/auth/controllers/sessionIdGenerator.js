// sessionIdGenerator.js
import crypto from 'crypto';

const generateSessionId = () => crypto.randomBytes(16).toString('hex');

export default generateSessionId;
