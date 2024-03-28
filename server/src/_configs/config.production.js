export const envProd = {

  curr: 'Production',
  IP: process.env.IP,
  port: process.env.PORT || 3000,

};  

export const scrapersCommandLine = true; 
export const scrapersSchedulers = true; 
export const scrapersAutoStart = false; 

export const scrapersConfigs = {

  "default" : {
    polling: {
      active: true, 
      url: '', 
      scheduler: 'BULL', 
      retry: { max: 10, delay: 20000 } 
    },   
    scraper: '',               
    scraperRetry: { max: 10, delay: 20000 },
    active: true,              
    commandLine: true,
    name: 'scrapeSC-supremecourt',     // Corresponds to CHEERIO filename
    nameDb: 'scrapeSC-supremecourt',   // Corresponds to SCRAPER database
    path: '/server/src/srvc_dataScrape/dataScrapers/court/',  // Corresponds to project/CHEERIO path
    primaryLocation: '',
    api: false,           // TODO: 
    numberOfRecords: {},  // TODO
    autoStart: {},        // TODO
    delays: {},           // TODO
    headers: {},          // TODO
    payload: {},          // TODO
    proxy: {},            // TODO
  },

  "scrapeSC-supremecourt": {
    polling: {
      active: true, 
      url: '', 
      scheduler: 'BULL', 
      retry: { max: 10, delay: 20000 } 
    },   
    scraper: '',
    scraperRetry: { max: 10, delay: 20000 },
    active: true,
    commandLine: true, 
    name: 'scrapeSC-supremecourt',     // Corresponds to CHEERIO filename
    nameDb: 'scrapeSC-supremecourt',   // Corresponds to SCRAPER database
    path: '/server/src/srvc_dataScrape/dataScrapers/court/',  
    primaryLocation: '',
    api: false,           // TODO: 
    numberOfRecords: {},  // TODO
    autoStart: {},        // TODO
    delays: {},           // TODO
    headers: {},          // TODO
    payload: {},          // TODO
    proxy: {},            // TODO
  },

}
