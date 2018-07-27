var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var bluebird    = require('bluebird');//use promise/await nodejs 7.6
var mongoose 	= require('mongoose');
var CONFIG	= require('./lib/config.js');

//created modules
var api = require('./routes/api.route');


//init mongoose
mongoose.Promise = bluebird;
mongoose.connect(CONFIG.DB, { useNewUrlParser: true }).
	then(()=>{console.log("connection to mongodb success")}).
	catch(()=>{console.log("connection to mongodb failed")});

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// use for allow Cross Origin Request (CORS)
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "http://localhost:31120");//request from app Angular 4
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  next();
});

app.use('/', indexRouter);
app.use('/users', usersRouter);

//for all route matched api
app.use('/api', api);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
