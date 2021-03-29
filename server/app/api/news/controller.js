const NewsAPI = require('newsapi');
const { v4: uuidv4 } = require('uuid');
const log = require('../../../log');
const API_KEY = process.env.API_KEY || 'API_KEY';
const newsapi = new NewsAPI(API_KEY);
const fs = require('fs');
const path = require('path');
const dataPath = path.join(__dirname, '/mock.json');

function generateUUID(dataArr) {
  return dataArr.map(data => {
    data.id = uuidv4();
    return data;
  });
}
module.exports.getTopHeadLine = async (req, res) => {
  const query = {
    language: 'en',
    country: req.query.country || 'gb'
  };
  if(req.query.category) {
    query.category = req.query.category;
  }
  log.info(query);
  try {
    log.debug('>>> getTopHeadlines(), Getting top headlines for today..');
    const response = await newsapi.v2.topHeadlines(query);
    response.articles = generateUUID(response.articles);
    log.debug('>>> getTopHeadlines(), successful!!');
    return res.status(200).json(response);
  } catch (error) {
    log.err('Failed to fetch top headlines', error);
    return res.status(500).json(error);
  }
};

// Fetch Mock data from json : Util function: development purpose in local
module.exports.getMockData = (req, res) => {
  fs.readFile(dataPath, 'utf8', (err, data) => {
    if (err) {
      throw err;
    }
    const response = JSON.parse(data);
    response.articles = generateUUID(response.articles);
    res.status(200).json(response);
  });
};

module.exports.getEverything = async (req, res) => {
  // TODO: Get page and pageSize from Client
  const query = {
    q: req.query.q,
    page: 1,
    pageSize: 20,
  };
  try {
    const response = await newsapi.v2.everything(query);
    log.debug('>>> getEverything(), Getting everything with query', query);
    return res.status(200).json(response);
  } catch (error) {
    log.err('>>> getEverything(), Failed to fetch everything', error);
    return res.status(500).json(error);
  }
};
