const express = require('express');
const path = require('path');
const url = require('url');
const bodyparser = require('body-parser');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const blogposts = require('./routes/blogposts');



const app = express();

app.set('views', './views');    // tells express where to find the views
app.set('view engine', 'pug');  // tells express to use pug as the template engine

// set up 'utility' middleware
app.use(cookieParser('cscie31-secret'));
app.use(session({
  secret:"cscie31",
  resave: "true",
  saveUninitialized: "true"
}));

app.use(express.json()); // handle json-formatted data
app.use(bodyparser.urlencoded({ extended:false}));

app.use('/', blogposts); // route everything to our blog page

app.use((req, res, next)=>{ // in case the unexpected happens
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
  });
module.exports = app;