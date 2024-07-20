const path = require('path');
const express = require('express');
const app = express();
const port = 3000;
const morgan = require('morgan');
const handlebars = require('express-handlebars').engine;
const route = require('./routes');
var methodOverride = require('method-override');
const sortMiddleware = require('./app/middleware/sortMiddleware');

// override method
app.use(methodOverride('_method'));

//db
const db = require('./config/db');

//connect
db.connect();

//template engine
app.engine(
    'hbs',
    handlebars({
        extname: '.hbs',
        helpers: {
            sum: (a, b) => a + b,
            sortable: require('./helpers/handlebars'),
        },
    })
);

//view engine
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'resources', 'views'));

//static file
app.use(express.static(path.join(__dirname, 'public')));

// body parser
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// morgan
// app.use(morgan('combined'));

//custom middleware
app.use(sortMiddleware);
//route
route(app);

app.listen(port, () => {
    console.log(`App listening on port ${port}`);
});
