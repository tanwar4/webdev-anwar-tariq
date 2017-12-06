/**
 * Created by tariq on 10/21/2017.
 */
module.exports= function (app) {
  var passport = require('passport');
  var LocalStrategy = require('passport-local').Strategy;
  var FacebookStrategy = require('passport-facebook').Strategy;
  var userModel = require('../model/user/user.model.server');


  app.post("/api/user",createUser);
  app.get("/api/user" ,findUserByCredentials);
  app.get("/api/user/:userId",findUserById);
  app.put("/api/user/:userId",updateUser);
  app.post ('/api/login', passport.authenticate('local'), login);
  app.post('/api/register', register);
  app.post('/api/logout', logout);
  app.post('/api/loggedIn', loggedIn);
  app.get('/facebook/login',
            passport.authenticate('facebook',{scope:'email'}));

  app.get('/facebook/oauth2callback',
            passport.authenticate('facebook',{
              successRedirect: 'https://webdev-anwar-tariq.herokuapp.com/profile',
              failureRedirect: 'https://webdev-anwar-tariq.herokuapp.com/login'
            }));


  var facebookConfig = {
    clientID: process.env.FACEBOOK_APP_ID,
    clientSecret: process.env.FACEBOOK_APP_SECRET,
    callbackURL: process.env.FACEBOOK_CALLBACK_URL
  };

  passport.use(new FacebookStrategy(facebookConfig,facebookStrategy));

  function facebookStrategy(token,refreshToken,profile,done) {
    userModel
      .findUserByFacebookId(profile.id)
      .then( function (user) {
            if(user) {return done(null,user);}
            else{
              var names = profile.displayName.split(" ");
              var newFacebookUser = {lastName : names[1],
                                      firstName : names[0],
                                      email: profile.emails ? profile.emails[0].value:"",
                                      facebook: {id:profile.id,token:token}};
              return userModel.createUser(newFacebookUser);
            }
      })
      .then( function (user) {
            return done(null,user);
      });
  }

  passport.use(new LocalStrategy(localStrategy));


  function login(req, res) {
    console.log(req.user);
    var user = req.user;
    res.json(user);
  }

  function logout(req, res) {
    req.logOut();
    res.send(200);
  }

  function loggedIn(req, res) {
    res.send(req.isAuthenticated() ? req.user : '0');
  }

  function register (req, res) {
    var user = req.body;
    userModel
      .createUser(user)
      .then(
        function(user){
          if(user){
            req.login(user, function(err) {
              if(err) {
                res.status(400).send(err);
              } else {
                res.json(user);
              }
            });
          }
        });
  }



  function localStrategy(username, password, done) {
    userModel
      .findUserByCredentials(username, password)
      .then(
        function(user) {
          if(user){
            if(user.username === username && user.password === password) {
              return done(null, user);
            }
          }else {
            return done(null, false);
          }
        },
        function(err) {
          if (err) {
            return done(err); }
        }
      );
  }


    function createUser(req,res) {
    var user = req.body;
     userModel.createUser(user)
       .then(function (user) {
         res.json(user);
       });
  }

  function findUserByCredentials(req,res) {
    var username = req.query["username"];
    var password = req.query["password"];

    if(username && password) {

      var promise = userModel.findUserByCredentials(username,password);
      promise.then(function (result) {
        if(result){
          res.json(result);
        }
        else {
          res.status(404).send({ error: "User not Found" });
        }
      });
      return;
    }
    else if(username && !password){ //find user by username
      var promise = userModel.findUserByUserName(username);
      promise.then(function (result) {
        if(result){
          res.json(result);
        }
        else {
          res.status(404).send({ error: "User not Found" });
        }
      });
      return;
    }
  }
  function findUserById(req,res){
    var userId = req.params["userId"];
    var promise = userModel.findUserById(userId);
    promise.then(function (result) {
      if(result){
        res.json(result);
      }
      else {
        res.status(404).send({ error: "User not Found" });
      }
    });
   return;
  }

  function updateUser(req,res) {
    var userId=req.params["userId"];
     var user= req.body;

      userModel.updateUser(userId,user)
        .then(function (status) {
          console.log(status);
            res.send(status);
        }, function (err) {
          console.log(err);
        });
    return;
  }

  passport.serializeUser(serializeUser);

  function serializeUser(user, done) {
    done(null, user);
  }

  passport.deserializeUser(deserializeUser);

  function deserializeUser(user, done) {
    userModel
      .findUserById(user._id)
      .then(
        function(user){
          done(null, user);
        },
        function(err){
          done(err, null);
        }
      );
  }





}
