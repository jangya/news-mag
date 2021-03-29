const express = require('express');

const apiRouter = require('./api');
const router = new express.Router();
module.exports = router;

router.use('/api', apiRouter);
