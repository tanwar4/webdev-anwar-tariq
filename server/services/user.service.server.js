/**
 * Created by tariq on 10/21/2017.
 */
module.exports= function (app) {

  app.post("/api/user",createUser);
  app.get("/api/user" ,findUserByCredentials);
  app.get("/api/user/:userId",findUserById);
  app.put("/api/user/:userId",updateUser);


  var users = [{_id:"123",username:"alice",password:"alice",firstName:"Alice",lastName:"Wonder",email:"alice@gmail.com"},
    {_id:'345',username:'bob',password:'bob',firstName:'bob',lastName:'Wonder',email:'alice@gmail.com'},
    {_id:"567",username:"charley",password:"charley",firstName:"charley",lastName:"Wonder",email:"alice@gmail.com"},
    {_id:"789",username:"jose",password:"jose",firstName:"jose",lastName:"Wonder",email:"alice@gmail.com"}
  ];

  function createUser(req,res) {
    var id  = Math.random().toFixed().toString();
    var user = req.body;
    user._id = id;
    users.push(user);
    res.json({"id":id});
  }

  function findUserByCredentials(req,res) {
    var username = req.query["username"];
    var password = req.query["password"];

    if(username && password) {
      var user = users.find(function (user) {
        return user.username === username && user.password === password;
      });
      console.log(user);
      if(user){
      res.json(user);
      }
      else {
        res.status(404).send({ error: "User not Found" });
      }

    }
    else if(username && !password){ //find user by username
      var user = users.find(function (user) {
        return user.username === username;
      });

      if(user) {
        res.json(user);
      }
      else{
        res.status(404).send({ error: "User not Found" });
      }

    }
  }
  function findUserById(req,res){
    var userId = req.params["userId"];
    var user = users.find(function (user) {
      return user._id === userId;
    });
    if(user){
    res.json(user);
    }
    else{
      res.status(404).send({ error: "User not Found" });
    }
  }

  function updateUser(req,res) {
    var userId=req.params["userId"];
     var user= req.body;
    var update = users.find(function (user) {
      return user._id === userId;
    });

    if(update) {
      update.username = user.username;
      update.email = user.email;
      update.firstName = user.firstName;
      update.lastName = user.lastName;
      res.json({"status": "true"});
    }
    else
       res.json({"status":"false"});

  }

}
