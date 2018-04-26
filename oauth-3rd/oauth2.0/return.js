var returnData = function(accessToken, refreshToken, profile, cb){
    var user = profile;
    console.log(user)
    return cb(user)
    /*
    User.findOrCreate({ googleId: profile.id }, function (err, user) {
      return cb(err, user);
    });
    */
}

module.exports = returnData;