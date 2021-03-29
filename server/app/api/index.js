const express = require('express');

const newsRouter = require('./news');
const router = new express.Router();
module.exports = router;

router.use('/news', newsRouter);
