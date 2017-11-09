/**
 * Created by tariq on 11/8/2017.
 */
/**
 * Created by tariq on 11/8/2017.
 */
var mongoose = require('mongoose');
var PageSchema = require('./page.schema.server');
var PageModel = mongoose.model("PageModel",PageSchema);
PageModel.createPage = createPage;
PageModel.findAllPagesForWebsite = findAllPagesForWebsite;
PageModel.findPageById = findPageById;
PageModel.deletePage = deletePage;
PageModel.updatePage = updatePage;

module.exports = PageModel;


function createPage(page){
  return PageModel.create(page);
}

function updatePage(pageId, page){
  return PageModel.findByIdAndUpdate(pageId,page);
}

function deletePage(pageId){
  return PageModel.findByIdAndRemove(pageId);
}

function findAllPagesForWebsite(websiteId) {
  return PageModel.find({websiteId:websiteId});
}

function findPageById(pageId) {
  return PageModel.findOne({_id:pageId});
}

