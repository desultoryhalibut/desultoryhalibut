require('./config/config.js')
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
//require('./workers/workers.js');

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

var server = app.listen(3000, function() {
  var host = server.address().address;
  var port = server.address().port;
  console.log('app listening at host, port:', host, port);
});








////////////////////////////////////////////////////////////////
// This code generates sample data.
////////////////////////////////////////////////////////////////
var queries = ['lululemon', 'nike', 'gold', 'unemployment'];
var numQueries = queries.length;
var quantity = 1000;

var entries = [];

for (var i = 0; i < quantity; i++) {
    var rand1 = Math.random();
    var rand2 = Math.random();

    var sentiment = {
        "topic": queries[ Math.floor(rand1 * numQueries) ],
        "volume": (rand2 * 1000) + 100,
        "score": (rand1 * 5) - (rand2 * 5),
        "time": Math.floor(i / 10)
    }

    entries.push(sentiment)
}
//////////////////////////////////////////////////////////
for (var i = 0; i < entries.length; i++) {
     // not sure what the name of our collection is
     var twitterSent = new tSentiment(entries[i]);
     twitterSent.save();
 }


twitterStream.twitterConnect();
module.exports = app;
