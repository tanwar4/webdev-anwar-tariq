/**
 * Created by tariq on 10/21/2017.
 */
module.exports= function (app) {
  var multer = require('multer');
  var upload = multer({ dest: __dirname+'/../../public/uploads'});


  app.post("/api/page/:pageId/widget",createWidget);
  app.get("/api/page/:pageId/widget" ,findAllWidgetsForPage);
  app.put("/api/widget/:widgetId",updateWidget);
  app.delete("/api/widget/:widgetId",deleteWidget);
  app.get("/api/widget/:widgetId",findWidgetById);

  var widgetModel = require('../model/widget/widget.model.server')


 function findAllWidgetsForPage(req,res){
   var pageId = req.params["pageId"];
    widgetModel.findAllWidgetsForPage(pageId)
      .then(function (widgets) {
        if(widgets){
          res.json(widgets);
        }
        else{
          res.status(404).send({ error: "Widget not Found" });
        }
      });
  }

  function findWidgetById(req,res) {
    var widgetId = req.params["widgetId"];
      widgetModel.findWidgetById(widgetId)
        .then(function (widget) {
          if(widget){
            res.json(widget);
          }
          else{
            res.status(404).send({error:"widget not found for page"});
          }
        });
  }

  function getWidgetById(widgetId){
    var widget = widgets.find(function (widget) {
      return widget._id === widgetId;
    });
    return widget;
  }

  function createWidget(req,res){
    var pageId = req.params["pageId"];
    var widget = req.body;
    widget.pageId = pageId;
    widgetModel.createWidget(widget)
      .then(function (widget) {
         res.json(widget);
      });
  }

 function updateWidget(req,res){
    var widgetId = req.params["widgetId"];
    var widget = req.body;

   widgetModel.updateWidget(widgetId,widget)
      .then(function (status) {
        res.json(status);
      });
  }

  function deleteWidget(req,res){
    var widgetId = req.params["widgetId"];
     widgetModel.deleteWidget(widgetId)
       .then(function (w) {
          res.json(w);
       });
  }
  
  app.post("/api/uploads",upload.single('myFile'),uploadFile);
  function uploadFile(req,res) {
    var widgetId      = req.body.widgetId;
    var myFile        = req.file;
    var originalname  = myFile.originalname; // file name on user's computer
    var filename      = myFile.filename;
    var userId = req.body.userId;
    var websiteId = req.body.webId;
    var pageId = req.body.pageId;
    var width  = req.body.width;

    var url = 'http://localhost:3100/uploads/' + filename;
    var domain = 'http://localhost:4200';
    if(process.env.MLAB_USERNAME_WEBDEV) {
       url = process.env.URL_PROD+'/uploads/'+ filename;
       domain =  process.env.URL_PROD;
    }

    var w  = {"type":"IMAGE","pageId":pageId,
      "size":"","text":"","width":width,"url":url};

    if(widgetId === '') {   // new image upload
       widgetModel.createWidget(w)
         .then(function (w) {
           widgetId = w._id;
         });
    }
    else{     //image update
       widgetModel.updateWidget(widgetId,w)
         .then(function (w) {
           console.log("Image Updated");
         });
    }

    var callbackUrl = domain+"/user/"+userId+"/website/"+websiteId+"/page/"+pageId+"/widget";
    res.redirect(callbackUrl);
  }


}
