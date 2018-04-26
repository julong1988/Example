var passport = require('passport');
var googleStrategy = require('passport-google-oauth20').Strategy;
var returnData = require('./return')

var googleOauth2 = passport.use(new googleStrategy({
    clientID: '629421509416-35a3aemr12hcngo7olgp7ats1thp6shm.apps.googleusercontent.com',
    clientSecret: '2raRFKgD1sWIkpCwzjtDRKyg',
    callbackURL: 'http://j-l.win:3000/auth/google/callback'
  },
  function(accessToken, refreshToken, profile, cb){
    returnData(accessToken, refreshToken, profile, cb)
  }
  ));

  module.exports = googleOauth2;