import dotenv from 'dotenv';
const result = dotenv.config({ path: './server/.env' }); // env file is in ./server/.env.

// Troubleshoot ENV file loading problems.
if (result.error) {
  console.log(`Current working directory: ${process.cwd()}`)
  throw result.error;
}

import { envDev } from './config.development.js';
import { envProd } from './config.production.js';
import { envTest} from './config.test.js';

// import dotenv from 'dotenv';
const environment = process.env.NODE_ENV || 'development';

const configs = {
  development: envDev,
  production: envProd,
  test: envTest,
};

export default configs[environment] || developmentConfig;