const GoogleTrendsRouter = require('express').Router();
const GoogleTrends = require('./google-trends.model');
const GoogleTrendsController = require('./google-trends.controller');

// Define API routes to /googletrends

GoogleTrendsRouter.get('/googletrends', GoogleTrendsController.get);

module.exports = GoogleTrendsRouter;
