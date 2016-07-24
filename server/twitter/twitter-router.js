const TwitterRouter = require('express').Router();
const Tweet = require('./twitter-model');
const TwitterController = require('./twitter-controller');

TwitterRouter.get('/', TwitterController.get);

module.exports = TwitterRouter;
