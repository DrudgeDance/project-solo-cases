// scraper.js
import { fork } from 'child_process';
import path from 'path';
import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';
// import Bull from 'bull';
// import fs from 'fs';
import dotenv from 'dotenv';
import { fileURLToPath, URL } from 'url';
import { dirname } from 'path';
dotenv.config();

// Initialize command line arguments
const argv = yargs( hideBin( process.argv ) ).argv;

// Function to dynamically load the configuration based on environment
async function loadConfig( environment ) {
  const configPath = `./../../_configs/config.${environment}.js`;
  try {
    return await import( configPath );
  } catch ( err ) {
    console.error(`Failed to import configuration: ${err}`);
    process.exit(1);
  }
}

class Scraper {
  constructor( configs ) {
    this.scrapers = new Map(); // Keeps track of scraper instances
    this.configs = configs;
    this.initializeCommandLine();

    if ( configs.scrapersAutoStart ) {
      this.autoStartScrapers();
    }
  
  }

  initializeCommandLine() {
    if ( this.configs.scrapersCommandLine ) {

      // Example command line parsing
      // You would need to expand this based on your specific commands and options
      if (argv._.includes('start') && argv.name) {
        this.startScraper(argv.name, argv.settings);
      } else if (argv._.includes('stop') && argv.name) {
        this.stopScraper(argv.name);
      }
      // Handle other commands similarly...
    }
  }

  startScraper( name, argSettings = {} ) {
    const { scrapersConfigs } = this.configs;

    let scraperConfig = scrapersConfigs[name] || scrapersConfigs.default;
    if (!scraperConfig) {
      console.error(`No configuration found for scraper: ${name}`);
      return;
    }
    const __dirname = dirname( fileURLToPath(import.meta.url) );

    scraperConfig = scrapersConfigs[name] || scrapersConfigs.default;
    const sSettings = { ...scraperConfig, ...argSettings };
    sSettings.scraperSettings.name = name;

    const scraperProcess = fork(path.join( __dirname, 'scraperWorker.js'), [JSON.stringify(sSettings.scraperSettings)]);

    if( scraperProcess ){
      console.log(`Started scraper: ${name}`);
      this.setupScraperListeners(scraperProcess, name);
      this.scrapers.set(name, scraperProcess);
    } else {
      console.log(`Failed to start: ${name}`)
    }
  }

  setupScraperListeners( process, name ) {
    process.on('message', message => console.log(`Message from ${name} scraper: ${message}`));
    process.on('error', error => console.error(`Error in ${name} scraper process: ${error}`));
    process.on('exit', (code, signal) => console.log(`${name} scraper process exited with code ${code} and signal ${signal}`));
  }

  stopScraper( name ) {
    const scraper = this.scrapers.get(name);
    if (scraper) {
      scraper.kill();
      this.scrapers.delete(name);
      console.log(`Stopped scraper: ${name}`);
    } else {
      console.log(`No active scraper found with the name: ${name}`);
    }
  }

  autoStartScrapers() {
    const { scrapersConfigs } = this.configs;
    Object.entries(scrapersConfigs).forEach(([name, config]) => {
      if (config.active) {
        this.startScraper( name );
      }
    });
  }

  // Implement other methods as needed...
}

async function main() {
  const environment = process.env.NODE_ENV || 'development';
  const configs = await loadConfig( environment );
  const scraper = new Scraper( configs );
  scraper.initializeCommandLine();
}

main().catch(err => console.error(err));