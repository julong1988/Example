//kakao, naver, google, twitter, instagram, facebook, wechat, alipay
var express = require('express');
var morgan = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
//var connectEnsureLogin = require('connect-ensure-login')
var indexRouter = require('./router/index');

//sns
var passport = require('passport');
var oauthConfig = require('./oauth2.0/config');




//** oauth sns import */

oauthConfig.map( function(item) { 
  require('./oauth2.0/'+item)
}) 



passport.serializeUser(function(user, cb) {
  cb(null, user);
});

passport.deserializeUser(function(obj, cb) {
  cb(null, obj);
});


// Create a new Express application.
var app = express();

// Configure view engine to render EJS templates.
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

// Use application-level middleware for common functionality, including
// logging, parsing, and session handling.
app.use(morgan('combined'));
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({ secret: 'keyboard cat', resave: true, saveUninitialized: true }));

// Initialize Passport and restore authentication state, if any, from the
// session.
app.use(passport.initialize());
app.use(passport.session());


// Define routes.
app.use('/', indexRouter);

app.listen(3000);