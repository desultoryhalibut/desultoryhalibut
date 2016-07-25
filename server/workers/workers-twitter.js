const twitterModels = require('../twitter/twitter-model');
const request = require('request');
const mongoose = require('mongoose');
var uri = 'mongodb://QuinKinser:Ron1680.@ds031608.mlab.com:31608/leaderboards';
db = mongoose.connect(uri);



const channels = {
  'nintendo' : ['nintendo'],
  'google' : ['google'],
  'ford': ['ford'],
  'disney': ['disney'],
  'genentech': ['genentech'],
  'gold': ['gold'],
  'negative': ['sell', 'volatility', 'panic', 'hedge'],
  'markets': ['dow', 's&p', 'stocks'],
};


const averageTweets = function(tweets, topic) {
  var tweets;
  const average = tweets.reduce(function(a, b) {
    return a + b.sentiment;
  }, 0);

  const numTweets = tweets.length;
  const tgroupAverage = {
    numTweets: numTweets,
    sentimentAverage: average / numTweets,
    time: Date.now()
  };

  twitterModels.TweetAverage.find({keyword: topic}, function(err, t) {
    if(!err) {
      if(t.length > 0) {
        twitterModels.TweetAverage.update({keyword: topic}, {$push: { data: tgroupAverage }}, function(err) {
          if(!err) {
            console.log('Record updated');
          }
        });
      } else {
        twitterModels.TweetAverage.create({keyword: topic, data: [' ']}, function (err) {
        });
      }
    } else {
      console.log(err);
    }
  });
}


var findTweet = function(topic){
  const interval = 60000;
  const previousDate = Date.now() - interval;
  console.log(previousDate);
  twitterModels.Tweet.find({tag: topic, time: {$gte: previousDate}}, function(err, tweets) {
    if(err) {
      console.log(err);
    } else {
      averageTweets(tweets, topic);
    }
  });
};



const getCollections = function(channels) {
  for(var topic in channels) {
    findTweet(topic);
  }
};

module.exports = {
  getCollections: getCollections,
  channels: channels
};
