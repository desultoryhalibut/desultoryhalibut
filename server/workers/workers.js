const googleTrends = require('google-trends-api');
const GoogleTrends = require('../googletrends/google-trends.model');
// const CronJob = require('cron').CronJob;

// collect Google Trends data from Google Trends API


googleTrends.trendData(['car', 'real estate agent', 'inflation', 'restaurant', 'unemployment', 'dow jones', 'hedge', 'panic'])
  .then(function(results) {

    let carTrend = {
      keyword: 'car',
      searchVolume: results[0]
    };

    let realEstateTrend = {
      keyword: 'real estate agent',
      searchVolume: results[1]
    };

    let inflationTrend = {
      keyword: 'inflation',
      searchVolume: results[2]
    };

    let restaurantTrend = {
      keyword: 'restaurant',
      searchVolume: results[3]
    };

    let unemploymentTrend = {
      keyword: 'unemployment',
      searchVolume: results[4]
    };

    let dowTrend = {
      keyword: 'dow jones',
      searchVolume: results[5]
    };

    let hedgeTrend = {
      keyword: 'hedge',
      searchVolume: results[6]
    };

    let panicTrend = {
      keyword: 'panic',
      searchVolume: results[7]
    };

    console.log('Seed database with Google Trends', results);

    GoogleTrends.create(carTrend);

    GoogleTrends.find({keyword: 'car'}).exec()
      .then(function(found) {
        if (found) {
          GoogleTrends.update({keyword: 'car'}, carTrend);
          console.log('Updated Google Trends cars');
        } else {
          GoogleTrends.create(carTrend);
        }
      });

    GoogleTrends.find({keyword: 'real estate agent'}).exec()
      .then(function(found) {
        if (found) {
          GoogleTrends.update({keyword: 'real estate agent'}, realEstateTrend);
          console.log('Updated Google Trends Real Estate Agent');
        } else {
          GoogleTrends.create(realEstateTrend);
        }
      });

    GoogleTrends.find({keyword: 'inflation'}).exec()
      .then(function(found) {
        if (found) {
          GoogleTrends.update({keyword: 'inflation'}, inflationTrend);
          console.log('Updated Google Trends Inflation');
        } else {
          GoogleTrends.create(inflationTrend);
        }
      });

    GoogleTrends.find({keyword: 'restaurant'}).exec()
      .then(function(found) {
        if (found) {
          GoogleTrends.update({keyword: 'restaurant'}, restaurantTrend);
          console.log('Updated Google Trends Restaurant');
        } else {
          GoogleTrends.create(restaurantTrend);
        }
      });

    GoogleTrends.find({keyword: 'unemployment'}).exec()
      .then(function(found) {
        if (found) {
          GoogleTrends.update({keyword: 'unemployment'}, unemploymentTrend);
          console.log('Updated Google Trends unemployment');
        } else {
          GoogleTrends.create(unemploymentTrend);
        }
      });

    GoogleTrends.find({keyword: 'dow jones'}).exec()
      .then(function(found) {
        if (found) {
          GoogleTrends.update({keyword: 'dow jones'}, dowTrend);
          console.log('Updated Google Trends Dow Jones');
        } else {
          GoogleTrends.create(dowTrend);
        }
      });

    GoogleTrends.find({keyword: 'hedge'}).exec()
      .then(function(found) {
        if (found) {
          GoogleTrends.update({keyword: 'hedge'}, hedgeTrend);
          console.log('Updated Google Trends hedge');
        } else {
          GoogleTrends.create(hedgeTrend);
          console.log('Created Google Trends hedge');
        }
      });

    GoogleTrends.find({keyword: 'panic'}).exec()
      .then(function(found) {
        if (found) {
          GoogleTrends.update({keyword: 'panic'}, panicTrend);
          console.log('Updated Google Trends Panic');
        } else {
          GoogleTrends.create(panicTrend);
        }
      });
  })
  .catch(function(err) {
    console.error('Error updating Google Trends ', err);
  });
