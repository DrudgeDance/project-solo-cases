import axios from 'axios';
import cheerio from 'cheerio';

/**
 * SCRAPE FOR SUPREME COURT CASES FROM SUPREME COURT WEBSITE
 */ 

async function cheerioFunction({ name, ScrapedDataModel }) {

  async function fetchOpinionData(year) {
    const url = `https://www.supremecourt.gov/opinions/slipopinion/${year}`;
    try {
      const response = await axios.get(url);
      const $ = cheerio.load(response.data);
      const data = [];

      $('.table.table-bordered tr').each((i, elem) => {
        if (i === 0) return; // skip the header row
        const cells = $(elem).find('td');

        // Use .prop('outerHTML') to get the full HTML of the <tr> element
        let rowData = $(elem).prop('outerHTML');
        rowData = rowData.replace(/>\s+</g, '><').trim();

        // Construct the object for this row, including the URL and the full HTML of the row
        let datum = {
          data: rowData, // String containing full HTML of the row
          url: url // Assuming 'url' is defined earlier as the page URL or specific URL for this row
        };

        data.push(datum);
      });

      return data;
    } catch (error) {
      console.error(`Error fetching data for year ${year}:`, error.message);
      return [];
    }
  }

  // Iterates over the specified years, scraping and saving data for each year
  for (let year = 22; year <= 23; year++) {
    const data = await fetchOpinionData(year);
    // Insert the scraped data into the database for the current year
    await Promise.all(data.map(datum => ScrapedDataModel.checkAndSaveDocument(datum)));
    console.log(`Year/Page ${year}: Data inserted into MongoDB collection "scraper${name}"`);
  }
}

export default cheerioFunction;