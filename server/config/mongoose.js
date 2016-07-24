const mongoose = require('mongoose');

module.exports = function() {

  // DigitalOcean MongoDB droplet
  mongoose.connect('mongodb://QuinKinser:Ron1680.@ds031608.mlab.com:31608/leaderboards');

  const db = mongoose.connection;

  db.on('error', console.error.bind(console, 'Error connecting to database'));
  db.once('open', console.log.bind(console, 'Connected to database!'));

};
