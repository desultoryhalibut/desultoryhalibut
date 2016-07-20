const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let googleTrends = new Schema({
  keyword: String,
  searchVolume: Array
});

let GoogleTrends = mongoose.model('GoogleTrends', googleTrends);

module.exports = GoogleTrends;
