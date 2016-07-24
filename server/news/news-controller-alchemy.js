const News = require('./news-model');
const NewsSentimentController = require('../sentiment/news-sentiment-controller');
const request = require('request');
const config = require('../config/config');
const watson = require('watson-developer-cloud');
const Promise = require('bluebird');
const helper = require('../config/utils')
const keywords = ['car', 'unemployment', 'inflation', 'real estate', 'acquisition', 'restaurants', 'dow jones', 'economy', 'panic']
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
      var n = news.reduce(function(prev, cur) {
        return prev += '. ' + cur.title;
      }, '');
      res.send(n);
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

    News.find().exec()
      .then(function(news) {
        for (var i = 0; i < news.length; i++) {
          var string = news[i].data.reduce(function(prev, cur) {
            return prev += '. ' + cur.headline.main
          }, '');
          console.log('string:',string)
          alchemyGetSentiment(string)
          .then(function(sentiment) {
            console.log("sentiment:",sentiment)
            res.send(sentiment);
          })
        } 
      })
    }


    
  }
}