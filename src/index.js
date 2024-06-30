const path = require('path')
const express = require('express');
const app = express();
const port = 3000;
const morgan = require('morgan');
const handlebars = require('express-handlebars').engine;

//template engine
app.engine('hbs', handlebars({
extname: ".hbs"
}))
app.set('view engine','hbs')
app.set("views", path.join(__dirname, "resources/views"));

//static file
app.use(express.static(path.join(__dirname,'public')))

// body parser
app.use(express.urlencoded({extended:true}));
app.use(express.json())
// morgan
app.use(morgan('combined'))

// route
app.get('/', (req, res) => {
  res.render('home')
})
app.get('/news', (req, res) => {
  res.render('news')
})
app.get('/search', (req, res) => {
  res.render('search')
})

app.post('/search', (req, res) => {
  res.send('SEARCH')
  console.log('BODY: ' + req.body.q);
})


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
})