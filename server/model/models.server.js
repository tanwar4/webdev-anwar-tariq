/**
 * Created by tariq on 11/7/2017.
 */

var connectionString = 'mongodb://127.0.0.1:27017/test'; // for local
if(process.env.MLAB_USERNAME_WEBDEV) { // check if running remotely
  var username = process.env.MLAB_USERNAME_WEBDEV; // get from environment
  var password = process.env.MLAB_PASSWORD_WEBDEV;
  connectionString = 'mongodb://' + username + ':' + password;
  connectionString += '@ds129344.mlab.com:29344/heroku_54hczqj6';
}

var mongoose = require("mongoose");
var db = mongoose.connect(connectionString,{
  useMongoClient: true
});
module.exports=db;
