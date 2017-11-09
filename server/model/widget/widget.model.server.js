/**
 * Created by tariq on 11/8/2017.
 */
var mongoose = require('mongoose');
var WidgetSchema = require('./widget.schema.server');
var WidgetModel = mongoose.model("WidgetModel",WidgetSchema);
WidgetModel.createWidget = createWidget;
WidgetModel.findAllWidgetsForPage = findAllWidgetsForPage;
WidgetModel.findWidgetById = findWidgetById;
WidgetModel.deleteWidget = deleteWidget;
WidgetModel.updateWidget = updateWidget;

module.exports = WidgetModel;


function createWidget(widget){
  return WidgetModel.create(widget);
}

function updateWidget(widgetId, widget){
  return WidgetModel.findByIdAndUpdate(widgetId, widget);
}

function deleteWidget(widgetId){
  return WidgetModel.findByIdAndRemove(widgetId);
}

function findAllWidgetsForPage(pageId) {
  return WidgetModel.find({pageId:pageId});
}

function findWidgetById(widgetId) {
  return WidgetModel.findOne({_id:widgetId});
}

function reorderWidget(pageId, start, end){

}

