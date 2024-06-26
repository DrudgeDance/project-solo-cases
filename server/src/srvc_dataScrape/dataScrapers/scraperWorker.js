// server/src/srvc_dataScrape/dataScrape/scraperWorker.js
import { db }  from '../db/db_scraper&poller.js';
import cheerioFunction from './court/cheerioSC-oyez.js';

import { fileURLToPath } from 'url';
import { dirname } from 'path';
import path from 'path';

const scrapeWebsite = async ({ name, pathCheerio }) => {
  const baseMongoUri = 'mongodb://localhost:27017/';
  const mongoUri = `${baseMongoUri}_scraped`;

  try {
    console.log(`scraperWorker_${name}: Start of data insertion attempt to collection.`);
    
    await db.open( mongoUri );
    
    const ScrapedDataModel = db.createModel( `scraper${ name }` ); 

    const __dirname = dirname(fileURLToPath(import.meta.url));
    const pathBug = 'file:///Users/adamduda/Desktop/__dev/projects/project-solo-cases/server/src/srvc_dataScrape/dataScrapers/court/cheerioSC-oyez.js'
    // try{
    //   //path.join(__dirname, `${pathCheerio}/cheerio${name}.js`)
    //   //const { default: cheerioFunction } = await import( pathBug );

    //   const module = await import(path.join(__dirname, `${pathCheerio}/cheerio${name}.js`));
    //   cheerioFunction = module.default;

    // } catch (e){
    //   console.log('error',e)
    // }
        console.log(path.join(__dirname, `${pathCheerio}/cheerio${name}.js`))
    // console.log("Child stuff", name, ScrapedDataModel)

    console.log("Starting cheerioFunction");
    try {
      await cheerioFunction({ name, ScrapedDataModel });
      console.log("cheerioFunction completed successfully");
    } catch (error) {
      console.error("Error in cheerioFunction:", error);
    }

    console.log(`scraperWorker_${ name }: End of data insertion attempt to collection.`);

  } catch (error) {
    console.error(`Error scraping using ${ name }: `, error);
  } finally {
    await db.close();
  }
}
 
// Modification starts here
// Check if the script has been passed any arguments

if (process.argv.length > 2) {
  // Parse the first argument after the script's name as JSON

  const args = JSON.parse(process.argv[2]);

  // Call scrapeWebsite with the parsed arguments
  if ( args.name && args.pathCheerio ) {
    scrapeWebsite( args );
  } else {
    console.log("Something wrong with NAME && PATHCHEERIO::", args);
  }
} else {
  console.log("No arguments provided to the scraper worker.");
}