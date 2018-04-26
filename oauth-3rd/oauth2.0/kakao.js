var passport = require('passport');
var kakaoStrategy = require('passport-kakao').Strategy;
var returnData = require('./return')

var kakaoOauth2 = passport.use(new kakaoStrategy({
    clientID: '01842c17f3f3599a4870591216e83e90',
    clientSecret: 'XCSDzNSEqcC3EY4rSNSStUzfwb5zXoEi',
    callbackURL: 'http://j-l.win:3000/auth/kakao/callback'
  },
  function(accessToken, refreshToken, profile, cb){
    returnData(accessToken, refreshToken, profile, cb)
  }
  ));

  module.exports = kakaoOauth2;