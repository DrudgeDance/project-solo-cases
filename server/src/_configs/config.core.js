import dotenv from 'dotenv';
const result = dotenv.config({ path: './server/.env' }); // env file is in ./server/.env.

// Troubleshoot ENV file loading problems.
if (result.error) {
  console.log(`Current working directory: ${process.cwd()}`)
  throw result.error;
}

import { env_development } from './config.development.js';
import { env_production } from './config.production.js';
import { env_test } from './config.test.js';

// import dotenv from 'dotenv';
const environment = process.env.NODE_ENV || 'development';

const configs = {
  development: env_development,
  production: env_production,
  test: env_test,
};

export default configs[environment] || developmentConfig;