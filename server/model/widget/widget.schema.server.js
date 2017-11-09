/**
 * Created by tariq on 11/9/2017.
 */
var mongoose = require('mongoose');
var WidgetSchema = mongoose.Schema({
  pageId:{type:mongoose.Schema.Types.ObjectId, ref:'PageModel'},
  type:String,
  size:String,
  text:String,
  width:String,
  url:String,
  rows:Number,
  class:String,
  icon:String,
  deletable:String,
  formatted:String
},{collection:'widget'});

module.exports =  WidgetSchema;
