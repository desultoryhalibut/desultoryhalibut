var News = require('./news-model');
var NewsSentimentController = require('../sentiment/news-sentiment-controller');
var request = require('request');
var config = require('../config/config');
var watson = require('watson-developer-cloud');
var Promise = require('bluebird');
var helper = require('../config/utils')
const keywords = ['car', 'unemployment', 'inflation', 'real estate', 'acquisition', 'restaurants', 'dow jones', 'economy', 'panic']
const companies = ['nintendo', 'disney', 'ford', 'google', 'gilead']
const alchemy_data_news = watson.alchemy_data_news({
  api_key: process.env.apikey
});
const alchemy_language = watson.alchemy_language({
  api_key: process.env.apikey
});


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
  
  searchAPI: function(req, res) {
    var word = req.params.search;
    
    request.get({
      url: "https://api.nytimes.com/svc/search/v2/articlesearch.json",
      qs: {
        'api-key': "cd2a0ddca6c645b38fd40bf4740dc21a",
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
      else
        res.send(body);
    })
  },
   getFromNewsAPI: function(req,res) {

    const keywords = ['consumer spending', 'unemployment', 'inflation', 'real estate', 'acquisition', 'restaurants', 'dow jones', 'economy', 'panic'];
      
      //Loop through to do a separate key word search on news articles within the past year
      for (var i = 0; i < keywords.length; i++) {
        module.exports.addToDB(keywords[i]);
      }
  
  },
 
  getCompaniesFromNewsAPI: function(req,res) {
    console.log('getCompaniesFromNewsAPI RUNNING');

    const companies = ['nintendo', 'disney', 'ford', 'google', 'gilead'];

      //Loop through to do a separate key word search on news articles within the past year
      for (var i = 0; i < companies.length; i++) {
        console.log('getCompaniesFromNewsAPI search on',companies[i])
        module.exports.addToDB(companies[i]);
      }
  
  },

  addToDB: function(keyword) {

    request.get({
      url: "https://api.nytimes.com/svc/search/v2/articlesearch.json",
      qs: {
        'api-key': "cd2a0ddca6c645b38fd40bf4740dc21a",
        'q': keyword,
        'fq': 'news_desk:("Automobiles" "Business" "Cars" "Culture" "Dining" "Editorial" "Education" "Financial" "Foreign" "Health" "Jobs" "Market Place" "Metro" "Metropolitan" "National" "Opinion" "Personal Investing" "Politics" "Retirement" "Science" "Small Business" "Society" "Sunday Business" "Technology" "Travel" "U.S." "Universal" "Vacation" "Wealth" "Week in Review" "Working" "Workplace" "World" "Your Money") AND body.search:(\""' + keyword + '\"")',
        'begin_date': '20160101',
        'end_date': '20160723',
        'sort': 'newest',
        'fl': 'web_url,snippet,headline,pub_date,type_of_material'
      },
    }, function(err, response, body) {

      //Once retrieved from API request, create entry in DB
      if(err) {
        console.log('Request failure:');
        console.error(err);
      } else {
        body = JSON.parse(body);
        body['keyword'] = keyword;
        console.log('creating entry in database:',keyword)
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

  inputSentiment: function(req, res) {  //relative route from api/news-model
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
    // News.find().exec()
    // .then(function(news) {
    //   console.log('searching database:', news);
    //   var results = { keyword: news.keyword };
    //   var n = news[9].data.reduce(function(prev, cur) {
    //     return prev += '. ' + cur.headline.main;
    //   }, '');
    //   results = {
    //     string: n,
    //     keyword: news[9].keyword
    //   } 
    //   res.send(results);
    // })
    // .catch(function(err) {
    //   console.error(err);
    // })

    News.find().exec()
      .then(function(news) {
        for (var i = 0; i < news.length; i++) {
          console.log("news[i].data:",news[i].data);
          let paramsSentiment = {
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