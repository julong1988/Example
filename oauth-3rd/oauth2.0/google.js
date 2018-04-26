var passport = require('passport');
var googleStrategy = require('passport-google-oauth20').Strategy;

var googleOauth2 = passport.use(new googleStrategy({
    clientID: '629421509416-35a3aemr12hcngo7olgp7ats1thp6shm.apps.googleusercontent.com',
    clientSecret: '2raRFKgD1sWIkpCwzjtDRKyg',
    callbackURL: 'http://j-l.win:3000/auth/google/callback'
  },
  function(accessToken, refreshToken, profile, cb) {
    var user = profile;
    console.log(user)
    return cb(user)
    /*
    User.findOrCreate({ googleId: profile.id }, function (err, user) {
      return cb(err, user);
    });
    */
  }
  ));

  module.exports = googleOauth2;