const mongoose = require('mongoose');
var uri = 'mongodb://QuinKinser:Ron1680.@ds031608.mlab.com:31608/leaderboards';
db = mongoose.connect(uri);

var conn = mongoose.connection;
conn.on('error', console.error.bind(console, 'connection error:'));
conn.once('open', function() {
  console.log('connected to the DB')
});

const tweetSchema = mongoose.Schema({
  tweet: {
    type: String,
    required: true
  },
  sentiment: {
    type: Number,
    required: true
  },
  tag: {
    type: String,
    required: true
  },
  time: {
    type: Date,
    default: Date.now
  }
});

const tweetAverageSchema = mongoose.Schema({
  keyword: {
    type: String,
    required: true
  },
  data: {
    type: Array,
    required: true
  }
});

const tweetModels = {
  Tweet: mongoose.model('Tweet', tweetSchema),
  TweetAverage: mongoose.model('TweetAverage', tweetAverageSchema)
};

module.exports = tweetModels;
