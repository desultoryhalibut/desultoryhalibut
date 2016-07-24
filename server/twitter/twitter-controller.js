require('../config/config.js');
const twitterModels = require('./twitter-model.js');
var sentiment = require('sentiment');
var TwitterStreamChannels = require('twitter-stream-channels');

var credentials = {
  "consumer_key": process.env['consumer_key'],
  "consumer_secret": process.env['consumer_secret'] ,
  "access_token": process.env['access_token'],
  "access_token_secret": process.env['access_token_secret']
};


var client = new TwitterStreamChannels(credentials);



////////////////////////////////////////////////////////////
// Stream tweets separated into channels/keywords
// While connection is open, keep doing something
////////////////////////////////////////////////////////////

var channels = {
  'nintendo' : ['nintendo'],
  'google' : ['google'],
  'ford': ['ford'],
  'disney': ['disney'],
  'genentech': ['genentech'],
  'gold': ['gold'],
  'negative': ['sell', 'volatility', 'panic', 'hedge'],
  'markets': ['dow', 's&p', 'stocks'],
};

var saveTweet = function(tag, tweet){
  var sentimentData = sentiment(tweet.text);
  if(sentimentData.score !== 0 ) {
    twitterModels.Tweet.create({ tweet: tweet.text, sentiment: sentimentData.score, tag: tag});
  }
};
var stream = client.streamChannels({track:channels});

for(topic in channels) {
  var channel = 'channels/' + topic;
  var tag = topic;


 // BOOOOOOM!!!!
  stream.on(channel, function() {
    var tag = topic;
    return saveTweet.bind(this, tag);
  }());
}



module.exports = {
  get: function(req, res) {
    twitterModels.TweetAverage.find().exec()
    .then(function(tweets) {
      res.json(tweets);
    })
    .catch(function(err) {
      res.send('Error fetching data');
    });
  },
};
