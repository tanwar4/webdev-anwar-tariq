/**
 * Created by tariq on 11/8/2017.
 */
/**
 * Created by tariq on 11/8/2017.
 */
var mongoose = require('mongoose');
var PageSchema = mongoose.Schema({
  websiteId:{type:mongoose.Schema.Types.ObjectId, ref:'WebsiteModel'},
  name:String,
  description:String
},{collection:'page'});

module.exports =  PageSchema;
