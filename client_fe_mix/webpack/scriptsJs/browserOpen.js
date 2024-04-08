import open from 'open';
import dotenv from 'dotenv';
import path, { dirname } from 'path';
import { fileURLToPath, URL } from 'url';

const __dirname = dirname( fileURLToPath(import.meta.url) );
dotenv.config({ path: path.resolve(__dirname, `./`, `..`, `server`, `.env`) });
// const env = process.env.NODE_ENV;

console.log("PROCESS.ENV", process.env.NODE_ENV)
if (process.env.NODE_ENV === 'development') {
  const url = 'http://localhost:8080';
  // Specify the path to Chrome and the user profile
  const chromeCanaryPath = '/Applications/Google Chrome Canary.app/Contents/MacOS/Google Chrome Canary'
  const userProfile = '--user-data-dir=/Users/adamduda/Library/Application Support/Google/Chrome Canary/Default';
  open(url, {app: {name: chromeCanaryPath, arguments: [userProfile, '--no-first-run', '--no-default-browser-check']}})
    .then(() => console.log(`Opened ${url} in Chrome with a specific profile.`))
    .catch((error) => console.error(`Failed to open ${url}:`, error));
}

if ( process.env.NODE_ENV !== 'development' ){
  console.log("Nothing ... see broserOpen.js ... debugging")
}