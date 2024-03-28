import axios from 'axios';
import cheerio from 'cheerio';

/**
 * SCRAPE FOR SUPREME COURT CASES FROM OYEZ WEBSITE
 */ 

async function cheerioFunction({ name, ScrapedDataModel }) {

  async function fetchOpinionData(year) {
    const url = `https://www.supremecourt.gov/opinions/slipopinion/${year}`;
    try {

      

      return opinions;
    } catch (error) {
      console.error(`Error fetching data for year ${year}:`, error.message);
      return [];
    }
  }

  // Iterates over the specified years, scraping and saving data for each year
  for (let year = 22; year <= 23; year++) {
    const opinions = await fetchOpinionData(year);
    // Insert the scraped data into the database for the current year
    await Promise.all(opinions.map(opinion => ScrapedDataModel.checkAndSaveDocument(opinion)));
    console.log(`Year/Page ${year}: Data inserted into MongoDB collection "scraper${name}"`);
  }
}

export default cheerioFunction;