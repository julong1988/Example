var express = require('express');
var router = express.Router();
var passport = require('passport');
var oauthConfig = require('../oauth2.0/config');

router.get('/',
  function(req, res) {
    res.render('home', { user: req.user });
  });

router.get('/login',
  function(req, res){
    res.render('login');
  });


oauthConfig.map(function(item) { 
    router.get('/auth/'+item,
        passport.authenticate(item, { scope: ['profile'] })
    );
    router.get('/auth/google/callback', 
        passport.authenticate(item, { failureRedirect: '/login' }),
        function(req, res) {
        // Successful authentication, redirect home.
            res.redirect('/');
    });
}) 




/*
app.get('/profile',
  connectEnsureLogin.ensureLoggedIn(),
  function(req, res){
    res.render('profile', { user: req.user });
  });
  */

 module.exports = router;