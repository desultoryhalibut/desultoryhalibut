const googleTrends = require('google-trends-api');
const GoogleTrends = require('../googletrends/google-trends.model');

const NSentiment = require('../sentiment/news-sentiment-model');
const News = require('../news/news-model');
const request = require('request');
const config = require('../config/config');
const watson = require('watson-developer-cloud');
const helper = require('../config/utils')


// Keywords for Dashboard Summary view
const KEYWORDS = ['car', 'real estate agent', 'inflation', 'restaurant', 'unemployment', 'dow jones', 'hedge', 'panic'];

/**
 * function reformatTrendsData - reformats Google Trends data to have date and volume properties
 * @param  {[Array]} trendsData [description]
 * @return {[Array]}            [description]
 */

function reformatTrendsData(trendsData) {
   return trendsData.map(item => {
     for (var key in item) {
       const obj = {};
       obj['date'] = key;
       obj['volume'] = item[key];
       return obj;
     }
   });
}


 /**
  * function QueryGoogleTrends - Helper function to seed data from GoogleTrends API to database
  * @param {[string]} keyword         [keyword to search for]
  * @param {[Array]} googleTrendData [return data from googleTrends search]
  */

function queryGoogleTrends(key, googleTrendResults) {
  const reformatData = reformatTrendsData(googleTrendResults);

  const newData = {
    'keyword': key,
    'searchVolume': reformatData
  };

  GoogleTrends.find({'keyword': key})
    .then(function(found) {
      if (found.length > 0) {
        GoogleTrends.update({'keyword': key}, newData);
        console.log(`Updated Google Trends for ${key}`, newData);
      } else {
        GoogleTrends.create(newData);
        console.log('created data', newData);
      }
    });
}
/**
 * function googleTrends.trendData - Updates database for GoogleTrends Summary keywords for dashboard view
 * @param  {[Array]} KEYWORDS [Array of keywords]
 */

// googleTrends.trendData(KEYWORDS)
//   .then(function(results) {

//     KEYWORDS.forEach((key, index) => {
//       queryGoogleTrends(key, results[index]);
//     });

//   })
//   .catch(function(err) {
//     console.error('Error updating Google Trends ', err);
//   });


////////////////////////////////////////////////////////////////////////
//////Seed database with news and sentiment API
////////////////////////////////////////////////////////////////////////

//Set up API keys
    const alchemy_data_news = watson.alchemy_data_news({
      api_key: process.env.apikey
    });
    const alchemy_language = watson.alchemy_language({
      api_key: process.env.apikey
    });

    const paramsNews = {
      start: 'now-60d',
      end: 'now',
      rank: 'high',
      maxResults: 50,  //change once database is up
      'q.enriched.url.enrichedTitle.keywords.keyword.text': 'unemployment^inflation^real estate^acquisition^restaurants^dow jones^economy^panic',
      return: 'enriched.url.title'
    };

    const paramsSentiment = {
      targets: ['inflation','unemployment','real estate', 'acquisition','restaurants','dow jones','economy']
    };

    const alchemyGetNews = function(params) {
      return new Promise (function(resolve, reject) {
        alchemy_data_news.getNews(params, function (err, news) {
        if (err)
          reject(err);
        else
          resolve(news);
        });
      });
    };
    const alchemyGetSentiment = function(params) {
      return new Promise (function(resolve,reject) {
        alchemy_language.sentiment(params, function(err, sent) {
          if (err) {
            reject(err);
          } else {
            console.log('sent:',sent)
            resolve(sent);
          }
        });
      })
    };

