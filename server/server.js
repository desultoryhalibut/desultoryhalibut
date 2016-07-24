
// require('./config/config.js')
// Config routing and database for news and sentiment APIs
var express = require('express');
var twitterStream = require('./twitter/twitter-controller');
var webpackDevMiddleware = require('webpack-dev-middleware');
var webpack = require('webpack');
var webpackConfig = require('../webpack.config.js');
var tSentiment = require('./sentiment/twitter-sentiment-model');
var app = express();

var compiler = webpack(webpackConfig);

require('./config/mongoose')();
require('./config/express')(app);
require('./config/routes')(app);
// Update GoogleTrends data
// require('./workers/workers.js');

// set static page
app.use(express.static(__dirname + '/../client/www'));

// boilerplate code, investigate further
app.use(webpackDevMiddleware(compiler, {
  hot: true,
  filename: 'bundle.js',
  publicPath: '/',
  stats: {
    colors: true,
  },
  historyApiFallback: true,
}));

var server = app.listen(3001, function() {
  var host = server.address().address;
  var port = server.address().port;
  console.log('app listening at host, port:', host, port);
});

module.exports = app;
