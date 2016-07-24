var NewsRouter = require('../news/news-router');
var NewsSentimentRouter = require('../sentiment/news-sentiment-router');
var GoogleTrendsRouter = require('../googletrends/google-trends.routes');
var path = require('path');
var TwitterRouter = require('../twitter/twitter-router');


module.exports = function(app) {

  // API routes to be used by Twitter, Google Trends, Sentiment, and News components
  app.use('/api/news', NewsRouter);
  app.use('/api/news/sentiment', NewsSentimentRouter);
  app.use('/api/googletrends', GoogleTrendsRouter);  //should be api/google?
  app.use('/api/twitter', TwitterRouter);

  // Display index.html at home path
  app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname, '../../client/www/index.html'));
  });

  // Handle wildcard requests and asset requests from front-end
  // app.get('/*', function(req, res) {
  //   res.sendFile(path.join(__dirname, '../../', req.url));
  // });

  app.get('/client/*', function(req, res) {
    res.sendFile(path.join(__dirname, '../../', req.url));
  });


};
