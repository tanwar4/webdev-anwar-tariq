/**
 * Created by tariq on 11/8/2017.
 */
var mongoose = require('mongoose');
var WebsiteSchema = mongoose.Schema({
   developerId:{type:mongoose.Schema.Types.ObjectId, ref:'UserModel'},
   name:String,
   description:String,
},{collection:'website'});

module.exports =  WebsiteSchema;
