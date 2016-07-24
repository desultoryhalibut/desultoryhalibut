const GoogleTrends = require('./google-trends.model');
const googleTrends = require('google-trends-api');

module.exports = {

  // Handle GET request from client for Google Trends data
  get: function(req, res) {
    GoogleTrends.find().exec()
    .then(function(trends) {
      res.json(trends);
    })
    .catch(function(err) {
      res.send('Error getting Google Trends', err);
    });
  },

  // finish this routing
  getCompany: function(req, res) {
    console.log('getCOmpany', req.url);
    let pos = req.url.lastIndexOf('/');
    let company = req.url.substring(pos + 1, req.url.length);

    googleTrends.trendData(company)
      .then(function(results) {
        console.log('getCompanyGoogle' + company, 'results ', results);
        res.json(results);
      })
      .catch(function(err) {
        console.error('Error retrieving Google Trends data', err);
      });
  }

};
