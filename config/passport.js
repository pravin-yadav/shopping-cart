var express = require('express');
var router = express.Router();
var passport = require('passport')
  , LocalStrategy = require('passport-local').Strategy;
var User = require('../models/user');


passport.serializeUser(function(user, done) {
  done(null, user.id);
});
 
passport.deserializeUser(function(id, done) {
  User.findById(id, function (err, user) {
    done(err, user);
  });
});

router.post('/user/signup', function(req, res){
  var name = req.body.name;
  var username  = req.body.username;
  var email = req.body.email;
  var password = req.body.password;

  if(user){
    console.log(name);
  }

});


passport.use(new LocalStrategy({
  usernameField : 'username',
  passwordField : 'password',
  passReqToCallback : true
},
  function(req,username, password, done) {
    User.findOne({ 'username': username }, function (err, user) {
      if (err) { return done(err); }
      if (user) { return done(null, false , {message : 'username already taken'}); }
      
      var newUser  = new User();
      newUser.username = username;
      newUser.password = newUser.encryptPassword(password);
      newUser.save(function(err, result){
        if(err){
          return done(err);
        }
        return done(null, newUser);
      })
    });
  }
));