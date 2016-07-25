const GoogleTrends = require('./google-trends.model');
const googleTrends = require('google-trends-api');

function reformatTrendsData(trendsData) {
   return trendsData.map(item => {
     for (var key in item) {
       let obj = {};
       obj['date'] = key;
       obj['volume'] = item[key];
       return obj;
     }
   });
}

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
<<<<<<< HEAD
    console.log('getCompany', req.url);
    var pos = req.url.lastIndexOf('/');
    var company = req.url.substring(pos + 1, req.url.length);
=======
    console.log('getCOmpany', req.url);
    const pos = req.url.lastIndexOf('/');
    const company = req.url.substring(pos + 1, req.url.length);
>>>>>>> master

    googleTrends.trendData(company)

      .then(function(results) {
        console.log(results);
        var reformatedResults = reformatTrendsData(results[0]);
        var newData = {
          'keyword': company,
          'searchVolume': reformatedResults
        };

        console.log('getCompanyGoogle' + company, 'results ', newData);
        res.json(newData);
      })
      .catch(function(err) {
        console.error('Error retrieving Google Trends data', err);
      });
  }

};
