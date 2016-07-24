const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const newsSchema = new Schema({
  data: { type: Array, required: true },
  hits: { type: Number, required: true },
  keyword: { type: String, required: true },
})

// newsSchema.set('timestamps', true);

const News = mongoose.model('News', newsSchema);

module.exports = News;


