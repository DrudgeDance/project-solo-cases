import axios from 'axios';
import cheerio from 'cheerio';

import database from './../db_mongo/db.js';
import insertOrUpdateOpinion from './../db_mongo/scData.js';


const scraper = {

  async run() {
    try{
      await this.connectDB();
      const data = await this.extractDataFromSupremeCourt(); // Assume this is filled with your scraped data
      const formattedData = this.format(data);
      await this.updateDB(formattedData);
    } finally {
      await database.closeDB();
    }

  },
 
  async connectDB(){
    await database.connectDB();
  },

  async extractDataFromSupremeCourt() {
    const baseURL = 'https://www.supremecourt.gov/opinions/slipopinion/';
    let allData = [];
  
    for (let year = 23; year >= 23; year--) {
      const url = `${baseURL}${year}`;
      const pageData = await this.scrapeSC(url);
      allData = allData.concat(pageData);
      console.log(`Data extracted from ${url}`);

      // await new Promise(resolve => setTimeout(resolve, 20000))
     }
  
    return allData;
  },

  async scrapeSC(url) {
    try {
      const { data } = await axios.get(url);
      const $ = cheerio.load(data);
      let tableRows = [];

      $('#list table tr').each((index, row) => {
        const cells = $(row).find('td').map((index, cell) => $(cell).text().trim()).get();
        if (cells.length > 0) { // Skip header rows or empty rows
          tableRows.push({
            date: cells[1],
            docket: cells[2],
            name: $(row).find('td a').text().trim(),
            link: $(row).find('td a').attr('href'),
            justice: cells[4],
            citation: cells[5],
            holdingSCDesc: $(row).find('td a').attr('title') 
          });
        }
      });

      return tableRows;
    } catch (error) {
      console.error(`Error occurred while scrapingCAFC: URL ${url}:`, error);
      return [];
    }
  },

  format(data) {
    return data.map(item => {

      const date = new Date(item.date);
  
      const urlObject = new URL(item.link, 'https://www.supremecourt.gov/');
      const pathParts = urlObject.pathname.split('/');
      const fileName = pathParts.pop();
      const path = pathParts.join('/');
      const baseUrl = urlObject.origin;
  
      const docketNo = item.docket.split('-');
      if (docketNo.length !== 2) {
        console.log('Unexpected docket array:', docketNo);
      }
      const [fiscalYear, sequenceNo] = docketNo;

      const parties = item.name.split(' v. ');
      if (parties.length !== 2) {
        console.log('Unexpected parties array:', parties);
      }
      const [petitioner, respondent] = parties;

      return {
        ...item,
        date,
        url: { baseUrl, path, fileName },
        docketNo: { fiscalYear, sequenceNo },
        parties: { petitioner, respondent },
      };
    });

  },

  async updateDB(data){
    for ( const item of data ){
      await insertOrUpdateOpinion(item);
    }
  },

};

scraper.run().catch((error) => {
  // Send an error message to the parent process
  process.send(`Error running scraper: ${error}`);
});


setInterval(() => {
  scraper.run().catch((error) => {
    // Send an error message to the parent process
    process.send(`Error running scraper: ${error}`);
  });
}, 24 * 60 * 60 * 1000);