//handle error http
const createError = require('http-errors');
//framework expressJS
const express = require('express');
//handle de original path where saved app
const path = require('path');
//hanlde client-cookies and parse/pipe in req
const cookieParser = require('cookie-parser');
//for dev
const logger = require('morgan');
//framework for connect/access mongoDB
const mongoose = require('mongoose');
const bluebird = require('bluebird');
//create/get session server variable
const session = require('express-session');
//mongoStore use for
const MongoStore = require('connect-mongo')(session);
//for accept cross origin resource sharing
const cors = require('cors');
//router
const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const apiRouter  = require('./routes/api.route');

mongoose.Promise = bluebird
mongoose.connect('mongodb://127.0.0.1:27017/my_todo', { useNewUrlParser: true })
    .then(()=> { console.log(`Succesfully Connected to the Mongodb Database  at URL : mongodb://127.0.0.1:27017/my_todo`)})
    .catch(()=> { console.log(`Error Connecting to the Mongodb Database at URL : mongodb://127.0.0.1:27017/my_todo`)});

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
//use this under for cors
// app.use(function(req, res, next) {
//   res.header("Access-Control-Allow-Origin", "http://localhost:4200");
//   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//   res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
//   next();
// });
//or use this one
app.use(cors({
    origin: "http://localhost:4200",
    optionsSuccessStatus: 200,
    credentials: true
}));

app.use(session({
    key: 'user_sid',
    secret: 'test auth',
    resave: true,
    saveUninitialized: false,
    store: new MongoStore({
        mongooseConnection: mongoose.connection
    }),
    cookie: {
        //for prod mode
        // secure: true,
        // expires: 60000
    }
}));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/api', apiRouter);

app.use((req, res, next)=>{
    if(req.cookies.user_sid && ! req.session.user)
        res.clearCookie('user_sid');
})

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
