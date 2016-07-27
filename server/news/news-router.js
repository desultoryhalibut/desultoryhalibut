

//express middleware to help route

const NewsController = require('./news-controller');
const NewsRouter = require('express').Router();

//grabs from news database:

NewsRouter.get('/', NewsController.getFromDB);
NewsRouter.get('/keywords', NewsController.getKeywordsFromDB);
NewsRouter.get('/companies', NewsController.getCompaniesFromDB);


NewsRouter.get('/dataset/:search', NewsController.searchAPI);

NewsRouter.get('/dataset/', NewsController.getFromNewsAPI);


NewsRouter.get('/getSentiment/', NewsController.alchemyGetSentiment);
NewsRouter.get('/dataset/strings/', NewsController.inputSentiment);

module.exports = NewsRouter;
