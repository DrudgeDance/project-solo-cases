// csrfTokenGenerator.js
import crypto  from 'crypto';

const generateCsrfToken = () => crypto.randomBytes(64).toString('hex');
const csrfTokenExpires = () => new Date(Date.now() + 15 * 60000); 

export { generateCsrfToken, csrfTokenExpires };
