const express = require('express');
const route = express.Router();

const siteRouter = require('../app/controllers/SiteController');

route.use('/search', siteRouter.search);
route.use('/', siteRouter.index);

module.exports = route;
