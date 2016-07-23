var NewsRouter = require('../news/news-router');
var NewsSentimentRouter = require('../sentiment/news-sentiment-router');
var GoogleTrendsRouter = require('../googletrends/google-trends.routes');
var path = require('path');

var TwitterRouter = require('../twitter/twitter-router');
// var sentimentRouter = require('../sentiment/sentiment-router');
// var financeRouter = require('../finance/finance-router')

// var requireAuth = function(req, res) {
  //  complete require auth function here
// }

module.exports = function(app) {

  app.use('/api/news', NewsRouter);
  app.use('/api/news/sentiment', NewsSentimentRouter);
  app.use('/api', GoogleTrendsRouter);  //should be api/google?
  app.use('/api', TwitterRouter);

  // app.get('/', function(req, res) {
  //   res.sendFile(path.join(__dirname,  '../../client/www/index.html'));
  // });

  // handle wildcard requests and asset requests from front-end
  // app.get('/*', function(req, res) {
  //   res.sendFile(path.join(__dirname + '../../' + req.url));
  // });

  // app.use('/api/twitter', TwitterRouter);
  // app.use('/api/newsSentiment', newsSentimentRouter);
  // app.use('/api/finance', financeRouter)
  // app.use('/api/users', UsersRouter);

};
