import { dirname, join } from 'path';
import { fileURLToPath } from 'url';
import { fork } from 'child_process';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Assuming process.env.NODE_ENV is set
const environment = process.env.NODE_ENV || 'development';

const loadScheduler = async () => {
  // Import a MODULE dynamically BASED on environment
  const schedulerModule = await import(`./schedulerService.${environment}.js`);
  // Schedule web scrape task immediately.
  // TODO: node-cron || setTimeout || setInterval
  schedulerModule.default(); 
};

loadScheduler().catch(console.error);