import axios from 'axios';
import cheerio from 'cheerio';

/**
 * SCRAPE FOR SUPREME COURT CASES FROM OYEZ WEBSITE
 */ 

async function cheerioFunction({ name, ScrapedDataModel }) {

  async function fetchCaseDetails(caseLink) {
    try {
      console.log("data entry for soyez")
      const response = await axios.get(`https://www.oyez.org${caseLink}`);
      const $ = cheerio.load(response.data);
      // Extract all elements with class="ng-scope" and concatenate their HTML content
      let ngScopeHtml = '';
      $('.ng-scope').each(function() {
        ngScopeHtml += $(this).html();
      });
      console.log(ngScopedHtml);
      return { ngScopeHtml }; // Return the concatenated HTML content
    } catch (error) {
      console.error(`Error fetching details for case: ${caseLink}`, error.message);
      return { ngScopeHtml: null }; // Fallback if there's an error
    }
  }

  async function fetchOpinionData(url) {
    try {
      const { data } = await axios.get(url);
      const $ = cheerio.load(data);
      let opinionsPromises = [];

      $('li[ng-repeat="case in pager.content"]').each((i, el) => {
        const caseLink = $(el).find('h2 a').attr('href');
        
        // Directly push the promise to fetch detailed HTML content
        opinionsPromises.push(fetchCaseDetails(caseLink).then(({ ngScopeHtml }) => ({
          caseLink,
          ngScopeHtml // Storing the detailed HTML content directly
        })));
      });

      return await Promise.all(opinionsPromises);
    } catch (error) {
      console.error(`Error fetching data from ${url}:`, error.message);
      return [];
    }
  }

  const yearsAndRanges = [
    ...Array(2024 - 1955).fill().map((_, i) => 2023 - i),
    '1940-1955',
    '1900-1940',
    '1850-1900',
    '1789-1850'
  ];

  for (const yearOrRange of yearsAndRanges) {
    const url = `https://www.oyez.org/cases/${yearOrRange}`;
    const opinions = await fetchOpinionData(url);
    
    for (const opinion of opinions) {
      await ScrapedDataModel.checkAndSaveDocument(opinion);
      console.log(`Saved detailed data for ${opinion.caseLink}`);
    }
  }

  console.log('Scraping completed.');
}

export default cheerioFunction;