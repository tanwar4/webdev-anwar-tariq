/**
 * Created by tariq on 10/21/2017.
 */
module.exports= function (app) {

  app.post("/api/user",createUser);
  app.get("/api/user" ,findUserByCredentials);
  app.get("/api/user/:userId",findUserById);
  app.put("/api/user/:userId",updateUser);

  var userModel = require('../model/user/user.model.server');

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

}
