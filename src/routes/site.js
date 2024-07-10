const express = require('express');
const route = express.Router();

const siteRouter = require('../app/controllers/SiteController');

route.get('/search', siteRouter.search);
route.get('/', siteRouter.index);

module.exports = route;
