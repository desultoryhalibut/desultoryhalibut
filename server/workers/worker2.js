

  const googleTrends = require('google-trends-api');
  const GoogleTrends = require('../googletrends/google-trends.model');
  // const CronJob = require('cron').CronJob;

  // collect Google Trends data from Google Trends API

  googleTrends.trendData(['car', 'real estate agent', 'inflation', 'restaurant', 'unemployment', 'dow jones', 'hedge', 'panic'])
    .then(function(results) {
      let carsTrend = results[0];
      let realEstateTrend = results[1];
      let inflationTrend = results[2];
      let restaurantTrend = results[3];
      let unemploymentTrend = results[4];
      let dowTrend = results[5];
      let hedgeTrend = results[6];
      let panicTrend = results[7];

      console.log(results);

      GoogleTrends.create({
        keyword: 'car',
        searchVolume: carsTrend
      });

      GoogleTrends.create({
        keyword: 'real estate agent',
        searchVolume: realEstateTrend
      });

      GoogleTrends.create({
        keyword: 'inflation',
        searchVolume: inflationTrend
      });

      GoogleTrends.create({
        keyword: 'restaurant',
        searchVolume: restaurantTrend
      });

      GoogleTrends.create({
        keyword: 'unemployment',
        searchVolume: unemploymentTrend
      });

      GoogleTrends.create({
        keyword: 'dow jones',
        searchVolume: dowTrend
      });

      GoogleTrends.create({
        keyword: 'hedge',
        searchVolume: hedgeTrend
      });

      GoogleTrends.create({
        keyword: 'panic',
        searchVolume: panicTrend
      });



    })
    .catch(function(err) {
      console.error('trendData_debt', err);
    });
