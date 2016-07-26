var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var nSentimentSchema = new Schema({
  newsTopic: {type: String},
  relevance: {type: Number},
  sentimentScore: {type: Number},
  type: {type: String},
})

nSentimentSchema.set('timestamps', true);

var NSentiment = mongoose.model('NSentiment', nSentimentSchema);

module.exports = NSentiment;