const express = require('express');

const ctrl = require('./controller');
const newsRouter = express.Router();

newsRouter.get('/top-headline', ctrl.getTopHeadLine);
newsRouter.get('/everything', ctrl.getEverything);
newsRouter.get('/mock', ctrl.getMockData);

module.exports = newsRouter;
