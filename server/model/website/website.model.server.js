/**
 * Created by tariq on 11/8/2017.
 */
/**
 * Created by tariq on 11/8/2017.
 */
var mongoose = require('mongoose');
var WebsiteSchema = require('./website.schema.server');
var WebsiteModel = mongoose.model("WebsiteModel",WebsiteSchema);
WebsiteModel.createWebsiteForUser = createWebsiteForUser;
WebsiteModel.findAllWebsitesForUser = findAllWebsitesForUser;
WebsiteModel.findWebsiteById = findWebsiteById;
WebsiteModel.deleteWebsite = deleteWebsite;
WebsiteModel.updateWebsite = updateWebsite;

module.exports = WebsiteModel;


function createWebsiteForUser(website){
  return WebsiteModel.create(website);
}

function updateWebsite(websiteId, website){
  /*  return WebsiteModel.update({_id:userId}, {$set: {"firstName": user.firstName,
   "lastName": user.lastName}});*/
  return WebsiteModel.findByIdAndUpdate(websiteId,website);
}

function deleteWebsite(websiteId){
  return WebsiteModel.findByIdAndRemove(websiteId);
}

function findAllWebsitesForUser(userId) {
  return WebsiteModel.find({developerId:userId});
}

function findWebsiteById(websiteId) {
  return WebsiteModel.findOne({_id:websiteId});
}

