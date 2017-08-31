const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

const port = process.env.PORT || 3000;

var app = express();

hbs.registerPartials(__dirname + '/views/partials/')

hbs.registerHelper('getCurrentYear', () => {
  return new Date().getFullYear()
});

hbs.registerHelper('getCapitalized', (text) => {
  return text.toUpperCase();
});

app.set('view engine', 'hbs');

// middleware
app.use((req, res, next) => {
  var now = new Date().toString();
  let log = `${now}: ${req.method} ${req.url}`;

  fs.appendFile('server.log', log + '\n', (error) => {
    console.log('Unable to append to server log.');
  });

  next();
});

// app.use((req, res, next) => {
//   res.render('maintenance.hbs');
// });

app.use(express.static(__dirname + '/public'));

app.get('/', (req, res) => {
  res.render('home.hbs', {
    pageTitle: 'Home Page',
    welcomeMessage: 'Welcome to my site!'
  })
});

app.get('/about', (req, res) => {
  res.render('about.hbs', {
    pageTitle: 'About Page'
  });
});

app.get('/bad', (req, res) => {
  res.send({
    errorMessage: 'Something went wrong! :('
  });
});

app.get('/projects', (req, res) => {
  res.render('projects.hbs', {
    pageTitle: 'Projects'
  });
});

app.listen(port, () => {
  console.log(`server is up on port ${port}`);
});
