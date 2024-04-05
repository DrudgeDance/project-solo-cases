// example config.development.js
export const env_development = {

  curr: "Development",
  IP: "localhost",
  PORT: 3030,

};

/**
   * 
   * SCRAPERS CONFIGURATIONS
   * 
   */

export const scrapersCommandLine = true;  // enables manual start of Scrapers through YARGS
                                          // in PRODUCTION mode:  overwrites scraperProjects object
                                          // in DEVELOPER mode:  overwrittte by scraperProjects object
                                          // in TEST mode:  overwrites scraperProjects object
export const scrapersSchedulers = true;   // enables BULL scheduler's SCHEDULE (but not initial start)
export const scrapersAutoStart = true;   // if TRUE then:
                                          // DEFAULT Behavior: should auto start ALL scrapers identified as ACTIVE (but not scheduler) 
                                          // DEFAULT Behavior: should start the schedulers, only if scrapersSchedulers is set to true
                                              // OTHERWISE give a warning
            
                                          // if FALSE then:  should not run queries unless initialized

//"scraperConfigs" should be applied with Object.assign({defaultConfig},{config.MODE.js settings}, {schedulerSestting (bull, etc)})
export const scrapersConfigs = {

  // "default" : {
  //   /** KEY IS:
  //   * Used for: pollerName, pollerDb, 
  //   * Used for: scraperName, scrapeDB, cheerioFilename
  //   */  
  //   active: false,     // always false for default, otherwise it'll get started unnecessarily
   
  //   // POLLING is checking a specifc address with a portion of a webpage hashed in DB.  Should that specific webpage change 
  //   // then a scrape process is initialized.
  //   pollerSettings: {
  //     scheduler: 'BULL',
  //     urls: {currUrl: '', futureUrl: '', },
  //     retry: { max: 5, delay: 20000 },
  //     //todoStretch: {  active: true, commandLine: true, },
  //   },   

  //   // Scraper settings// filename for Db / Cheerio Scraping Logic File//path for Cheerio function
  //   scraperSettings: { pathCheerio: '/court', },
  //   //todoStretch: { active: true, commandLine: true, retry: { max: 10, delay: 20000 }, },
  //   //todosFuture: { api: false,numberOfRecords: {}, autoStart: {}, delays: {}, headers: {}, payload: {}, proxy: {}, },

  //   /******************************************************************************************************/  
  //   active: true,              // identifie the specific SCRAPER as ACTIVE in all modes (dev/prod/test)
  //                               // IF active is set to FALSE that scraper WILL NOT AutoStart - give warning on which scraper
  //   commandLine: true,         // in PRODUCTION mode:  Overwritten by "scapersCommandLine"
  //                               // in DEVELOPMENT mode:  Overwrites "scrapersCommandLine"
  //                               // in TEST mode:  same as in DEVELOPMENT mode
  //   scraperRetry: { max: 10, delay: 20000 },
  //   /******************************************************************************************************/
  //   api: false,                // TODO: could corresond to something if api active
  //   numberOfRecords: {},       // NUMBER corresponding to MAX records scraped per scheduled scrape (per BULL scheduler)
  //   autoStart: {},             // OVERWRITTEN to false if "scrapersAutoStart" set to false
  //   delays: {},                // different times, in ms, for delays
  //     // IDEAS
  //   headers: {},   // if Target site requires specific headers for access (User-Agent / Authentication tokens, etc)
  //   payload: {},   // for interacting with forms (forms, logins, etc)
  //   proxy: {},     // for avoiding IP bans, geographic testing, (obj w/ IP, port, username for proxy)
  //   /******************************************************************************************************/
  // },


  // "SC-supremecourt": {         // KEY 
  //    /** KEY IS:
  //    * Used for: pollerName, pollerDb, 
  //    * Used for: scraperName, scrapeDB, cheerioFilename
  //    */  
  //   active: true, 

  //   pollerSettings: {    
  //     scheduler: 'BULL',
  //     urls: { currUrl: '', futureUrl: '', },
  //     retry: { max: 5, delay: 20000, },
  //     //todoStretch: {  active: true, commandLine: true, },
  //   },

  //   scraperSettings: { pathCheerio: '/court', },
  //     //todoStretch: { active: true, commandLine: true, retry: { max: 10, delay: 20000 }, },
  //     //todosFuture: { api: false,numberOfRecords: {}, autoStart: {}, delays: {}, headers: {}, payload: {}, proxy: {}, },

  // },


  "SC-oyez": {         // KEY 
    /** KEY IS:
    * Used for: pollerName, pollerDb, 
    * Used for: scraperName, scrapeDB, cheerioFilename
    */  
   active: true, 

   pollerSettings: {    
     scheduler: 'BULL',
     urls: { currUrl: '', futureUrl: '', },
     retry: { max: 5, delay: 20000, },
     //todoStretch: {  active: true, commandLine: true, },
   },

   scraperSettings: { pathCheerio: '/court', },
     //todoStretch: { active: true, commandLine: true, retry: { max: 10, delay: 20000 }, },
     //todosFuture: { api: false,numberOfRecords: {}, autoStart: {}, delays: {}, headers: {}, payload: {}, proxy: {}, },

 },
//  "SC-wikipedia": {         // KEY 
//   /** KEY IS:
//   * Used for: pollerName, pollerDb, 
//   * Used for: scraperName, scrapeDB, cheerioFilename
//   */  
//  active: true, 

//  pollerSettings: {    
//    scheduler: 'BULL',
//    urls: { currUrl: '', futureUrl: '', },
//    retry: { max: 5, delay: 20000, },
//    //todoStretch: {  active: true, commandLine: true, },
//  },

//  scraperSettings: { pathCheerio: '/court', },
//    //todoStretch: { active: true, commandLine: true, retry: { max: 10, delay: 20000 }, },
//    //todosFuture: { api: false,numberOfRecords: {}, autoStart: {}, delays: {}, headers: {}, payload: {}, proxy: {}, },

// },
}










