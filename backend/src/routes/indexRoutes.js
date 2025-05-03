const express = require('express');
const postRouter = require('./postRoutes');
const rootRouter = express.Router();

rootRouter.use('/post',postRouter)

module.exports = rootRouter;