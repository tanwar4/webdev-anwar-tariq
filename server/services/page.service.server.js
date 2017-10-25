/**
 * Created by tariq on 10/21/2017.
 */
module.exports= function (app) {

  app.post("/api/website/:websiteId/page",createPage);
  app.get("/api/website/:websiteId/page" ,findAllPagesForWebsite);
  app.get("/api/page/:pageId",findPageById);
  app.put("/api/page/:pageId",updatePage);
  app.delete("/api/page/:pageId",deletePage);

  var pages = [
    {_id:"321",name:"post1",websiteId:"123",description:"Lorem Ipsum"},
    {_id:"432",name:"Blog",websiteId:"123",description:"Lorem Ipsum"},
    {_id:"313",name:"post3",websiteId:"123",description:"Lorem Ipsum"}
  ];


  function findAllPagesForWebsite(req,res){
    var websiteId = req.params["websiteId"];
    var page = pages.filter(function (page) {
      return page.websiteId === websiteId;
    });
    if(page){
      res.json(page);
    }
    else{
      res.status(404).send({ error: "Page not Found for website" });
    }
  }
 function  findPageById(req,res) {
    var pageId = req.params["pageId"];
    var page = pages.find(function (page) {
      return page._id === pageId;
    });
   if(page){
     res.json(page);
   }
   else{
     res.status(404).send({ error: "Page not Found for PageId" });
   }
  }

 function  createPage(req,res){
    var pageId= Math.random().toString();
    var page = req.body;
    page.websiteId= req.params["websiteId"];
    page._id = pageId;
    pages.push(page);
    res.json({"web_id":page});
  }

 function updatePage(req,res){

    var pageId = req.params["pageId"];
    var page = req.body;
    var update =  pages.find(function (page) {
      return page._id === pageId;
    });
    if(update) {
      update.name = page.name;
      update.description = page.desc;
      res.json(update);
    }
   else{
      res.status(404).send({ error: "Unable to Update" });
    }
  }

 function  deletePage(req,res){
    var pageId = req.params["pageId"];
    var p = pages.find(function (page) {
      return page._id === pageId;
    });

    if(p) {
      var index = pages.indexOf(p);
      pages.splice(index, 1);
      res.json(p);
    }
   else{
      res.status(404).send({ error: "Unable to delete" });
    }
  }
}
