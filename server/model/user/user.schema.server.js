/**
 * Created by tariq on 11/8/2017.
 */
var mongoose = require('mongoose');
var UserSchema = mongoose.Schema({
  username:String,
  password:String,
  firstName:String,
  lastName:String,
  email:String,
  phone:String,
  facebook: {
    id:    String,
    token: String
  }

},{collection:'user'});

module.exports =  UserSchema;
