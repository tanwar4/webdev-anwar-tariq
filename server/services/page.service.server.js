/**
 * Created by tariq on 10/21/2017.
 */
module.exports= function (app) {

  app.post("/api/website/:websiteId/page", createPage);
  app.get("/api/website/:websiteId/page", findAllPagesForWebsite);
  app.get("/api/page/:pageId", findPageById);
  app.put("/api/page/:pageId", updatePage);
  app.delete("/api/page/:pageId", deletePage);

  var pageModel = require('../model/page/page.model.server')

  function findAllPagesForWebsite(req, res) {
    var websiteId = req.params["websiteId"];
    pageModel.findAllPagesForWebsite(websiteId)
      .then(function (pages) {
        if (pages) {
          res.json(pages);
        }
        else {
          res.status(404).send({error: "Page not Found for website"});
        }
      });
  }

  function findPageById(req, res) {
    var pageId = req.params["pageId"];
    pageModel.findPageById(pageId)
      .then(function (page) {
        if (page) {
          res.json(page);
        }
        else {
          res.status(404).send({error: "Page not Found for PageId"});
        }
      });
  }

  function createPage(req, res) {
    var page = req.body;
    page.websiteId = req.params["websiteId"];
    pageModel.createPage(page)
      .then(function (page) {
        res.json(page);
      });
  }

  function updatePage(req, res) {

    var pageId = req.params["pageId"];
    var page = req.body;

    pageModel.updatePage(pageId, page)
      .then(function (status) {
        res.json(status);
      });
  }

  function deletePage(req, res) {
    var pageId = req.params["pageId"];
    pageModel.deletePage(pageId)
      .then(function (p) {
        res.json(p);
      });
  }
}
