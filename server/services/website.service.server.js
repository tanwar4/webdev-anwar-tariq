/**
 * Created by tariq on 10/21/2017.
 */
module.exports= function (app) {

  app.post("/api/user/:userId/website",createWebsite);
  app.get("/api/user/:userId/website" ,findAllWebsitesForUser);
  app.get("/api/website/:websiteId",findWebsiteById);
  app.put("/api/website/:websiteId",updateWebsite);
  app.delete("/api/website/:websiteId",deleteWebsite);

  var websiteModel = require('../model/website/website.model.server');

  var websites = [{_id:"123",name:"facebook",developerId:"345",description:"A social networking website"},
    {_id:"234",name:"twitter",developerId:"345",description:"A social networking website"},
    {_id:"456",name:"instagram",developerId:"345",description:"A social networking website"},
    {_id:"678",name:"snapchat",developerId:"789",description:"A social networking website"}];

  function findWebsiteById(req,res){
    var websiteId = req.params["websiteId"];
    websiteModel.findWebsiteById(websiteId)
      .then(function (web) {
        if(web){
          res.json(web);
        }
        else{
          res.status(404).send({ error: "Website not Found" });
        }
      });

  }
  function findAllWebsitesForUser(req,res) {
    var userId = req.params["userId"];
    websiteModel.findAllWebsitesForUser(userId)
         .then(function (web) {
        if(web){
          res.json(web);
        }
        else{
          res.status(404).send({ error: "Website not Found" });
        }
      });
  }

  function createWebsite(req,res){
    var userId = req.params["userId"];
    var website = req.body;

    website.developerId = userId;
    websiteModel.createWebsiteForUser(website)
      .then(function (web) {
        res.json(web);
      });
  }

  function updateWebsite(req,res){
    var websiteId = req.params["websiteId"];
    var website = req.body;

    websiteModel.updateWebsite(websiteId,website)
      .then(function (status) {
        res.json(status);
      });
  }

  function deleteWebsite(req,res){
    var websiteId = req.params["websiteId"];
     websiteModel.deleteWebsite(websiteId)
       .then(function (w) {
         res.json(w);
       },function (err) {
         console.log(err);
       });
  }

}
