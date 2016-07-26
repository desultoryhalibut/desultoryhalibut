const mongoose = require('mongoose');

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
