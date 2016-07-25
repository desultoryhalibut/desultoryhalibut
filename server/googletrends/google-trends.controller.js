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
    var pos = req.url.lastIndexOf('/');
    var company = req.url.substring(pos + 1, req.url.length);
<<<<<<< HEAD

=======
>>>>>>> a7a9310fbcd0f05d510713aa8af3ec2d805eb863

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
