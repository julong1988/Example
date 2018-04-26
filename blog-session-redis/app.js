var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var RedisStore = require('connect-redis')(session);
//var logger = require('morgan');
var mongoose = require('mongoose');

var indexRouter = require('./routes/index');

global.postHandle = require('./db/postHandle');
global.userHandle = require('./db/userHandle');
global.db = mongoose.connect("mongodb://localhost:27017/test_blog");

var app = express();
app.use(session({
  secret: 'secret',
  store: new RedisStore({ host: 'localhost', port: 6379}),
  cookie: {
    maxAge: 1000 * 60 * 30
  }
}));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

//app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(function(req, res, next) {
  res.locals.user = req.session.user;
  var err = req.session.error;
  delete req.session.error;
  res.locals.message = "";

  next();
});

app.use('/', indexRouter);

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
