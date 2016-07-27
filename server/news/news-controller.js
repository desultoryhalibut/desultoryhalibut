var News = require('./news-model');
var NewsSentimentController = require('../sentiment/news-sentiment-controller');
var request = require('request');
var config = require('../config/config');
var watson = require('watson-developer-cloud');
var Promise = require('bluebird');
var helper = require('../config/utils')
const allWords = ['consumer spending', 'unemployment', 'inflation', 'real estate', 'acquisition', 'restaurants', 'dow jones', 'economy', 'nintendo', 'disney', 'ford', 'google'];
const keywords = ['consumer spending', 'unemployment', 'inflation', 'real estate', 'acquisition', 'restaurants', 'dow jones', 'economy'];
const companies = ['nintendo', 'disney', 'ford', 'google'];

const alchemy_language = watson.alchemy_language({
  api_key: process.env.apikey
});
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

module.exports = {


  getFromDB: function(req, res) {  //relative route from api/news-model
    News.find().exec()
    .then(function(news) {
      res.send(news);
    })
    .catch(function(err) {
      console.error(err);
    })
  },

  getKeywordsFromDB: function(req, res) {  //relative route from api/news-model
    News.find().exec()
    .then(function(news) {
      news = news.filter(function(val) {
        return (keywords.indexOf(val.keyword) > -1)
      })
      res.send(news);
    })
    .catch(function(err) {
      console.error(err);
    })
  },

  getCompaniesFromDB: function(req, res) {  //relative route from api/news-model
    News.find().exec()
    .then(function(news) {
      news = news.filter(function(val) {
        return (companies.indexOf(val.keyword) > -1)
      })
      res.send(news);
    })
    .catch(function(err) {
      console.error(err);
    })
  },

  //for individual searches (not used currently)
  searchAPI: function(req, res) {
    var word = req.params.search;

    request.get({
      url: "https://api.nytimes.com/svc/search/v2/articlesearch.json",
      qs: {
        'api-key': process.env.api,
        'q': word,
        'fq': 'news_desk:("Automobiles" "Business" "Cars" "Culture" "Dining" "Editorial" "Education" "Financial" "Foreign" "Health" "Jobs" "Market Place" "Metro" "Metropolitan" "National" "Opinion" "Personal Investing" "Politics" "Retirement" "Science" "Small Business" "Society" "Sunday Business" "Technology" "Travel" "U.S." "Universal" "Vacation" "Wealth" "Week in Review" "Working" "Workplace" "World" "Your Money") AND body.search:(\""' + word + '\"")',
        'begin_date': '20160101',
        'end_date': '20160723',
        'sort': 'newest',
        'fl': 'web_url,snippet,headline,pub_date,type_of_material'
      },
    }, function(err, response, body) {
      if (err)
        console.error(err);
      else {
        alchemyGetSentiment
        res.send(body);
      }
    })
  },

  //Update database with news for keywords/companies
  //TO DO: cron that calls getFromNewsAPI once a day.
  getFromNewsAPI: function(req,res) {
      //Loop through to do a separate key word search on news articles written about key words on economic health and companies within the past year
      for (var i = 0; i < allWords.length; i++) {
        module.exports.addToDB(allWords[i]);
      }
  },

  addToDB: function(keyword) {
    //add function to wipe database to not repeat data entries before adding
    response.get({
      url: "/api/news"
    }, function(err, response, body) {
      //Once retrieved from API request, create entry in DB
      if(err) {
        console.error(err);
      } else {
        body = JSON.parse(body);
        body['keyword'] = keyword;
        console.log('creating entry in database on:',keyword)
        News.create({
          data: body.response.docs,
          hits: body.response.meta.hits,
          keyword: body.keyword
        }, function(err, done) {
          if (err)
            console.error(err);
          else
            console.log('saved in db',done);
        });
      }
    })
  },

  // output: updated sentiment scores in database
  inputSentiment: function(req, res) {  

    News.find().exec()
    .then(function(news) {
      var strings = [];
      for (var i = 0; i < news.length; i++) {
      console.log('searching database:', news[i]);

        var n = news[i].data.reduce(function(prev, cur) {
          return prev += '. ' + cur.headline.print_headline;
        }, '');
        results = {
          string: n,
          keyword: news[i].keyword
        }
      }
      res.send(strings);
    })
    .catch(function(err) {
      console.error(err);
    })
  },

  alchemyGetSentiment: function(req,res) {
    // Create async functions to grab from APIs:
    
    News.find().exec()
      .then(function(news) {
        for (var i = 0; i < news.length; i++) {
          var paramsSentiment = {
            text: news[i].data.reduce(function(prev, cur) {
              return prev += '. ' + cur.headline.main;
            }, ''),
            targets: ['inflation','unemployment','real estate', 'acquisition','restaurants','dow jones','economy']
          };
          alchemyGetSentiment(paramsSentiment)
          .then(function(sentiment) {
            News.update({keyword: sentiment.results.text}, {sentimentScore: sentiment.results.score}, function(err, done) {
              if (err) {
                console.log('Error in updating news db')
              } else {
                console.log('Successfully loaded in database:',done)
              }
            });
          })
          .catch(function(err) {
            console.error(err);
          })
        } 
      })
    }
  };

