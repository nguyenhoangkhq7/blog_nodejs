const newsRouter = require('./news');
const siteRouter = require('./site');
const courseRouter = require('./course');
const meRouter = require('./me');
// route
function route(app) {
    app.use('/courses', courseRouter);
    app.use('/me', meRouter);
    app.use('/news', newsRouter);
    app.use('/', siteRouter);
    // app.use('/search', siteRouter)
}

module.exports = route;
