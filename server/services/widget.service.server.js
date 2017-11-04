/**
 * Created by tariq on 10/21/2017.
 */
module.exports= function (app) {
  var multer = require('multer');
  var upload = multer({ dest: __dirname+'/../../public/uploads'}).single("myFile");


  app.post("/api/page/:pageId/widget",createWidget);
  app.get("/api/page/:pageId/widget" ,findAllWidgetsForPage);
  app.put("/api/widget/:widgetId",updateWidget);
  app.delete("/api/widget/:widgetId",deleteWidget);

  app.get("/api/widget/:widgetId",findWidgetById);



  var widgets = [
    {_id:"123",widgetType:"HEADING",pageId:"321",size:"2",text:"Gizmodo",width:"",url:""},
    {_id:"345",widgetType:"IMAGE",pageId:"321",size:"",text:"Gizmodo",width:"100",url:"http://lorempixel.com/400/200/"},
    {_id:"567",widgetType:"HEADING",pageId:"321",size:"4",text:"Another Heading",width:"",url:""},
    {_id:"789",widgetType:"YOUTUBE",pageId:"321",size:"",text:"Gizmodo",width:"100",url:"https://www.youtube.com/embed/nhyc5ca3eVw"}
  ];


 function findAllWidgetsForPage(req,res){
   var pageId = req.params["pageId"];
    var widget = widgets.filter(function (widget) {
      return widget.pageId === pageId;
    });

    if(widget){
      res.json(widget);
    }
    else{
      res.status(404).send({ error: "Widget not Found" });
    }
  }

  function findWidgetById(req,res) {
    var widgetId = req.params["widgetId"];
/*    var widget = widgets.find(function (widget) {
      return widget._id === widgetId;
    });*/
     var widget = getWidgetById(widgetId);
    if(widget){
      res.json(widget);
    }
    else{
      res.status(404).send({error:"widget not found for page"});
    }
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
    var  widgetId = Math.random().toString();
    //set widget based on type
    if(widget.type === "HEADING"){
      var w  = {"_id":widgetId,"widgetType":widget.type,"pageId":pageId,
               "size":widget.size,"text":widget.text,"width":"","url":"" };
      widgets.push(w);
      res.json(w);
    }
    else if(widget.type === "IMAGE"){
    //  const w:Widget = new Widget(widgetId,widget.type,pageId,"","",widget.width,widget.url);
      var w  = {"_id":widgetId,"widgetType":widget.type,"pageId":pageId,
                "size":"","text":"","width":widget.width,"url":widget.url};
      widgets.push(w);
      res.json(w);
    }
    else if(widget.type === "HTML"){
     // const w:Widget = new Widget(widgetId,widget.type,pageId,"",widget.text,"","");
      var w  = {"_id":widgetId,"widgetType":widget.type,"pageId":pageId,
               "size":"","text":widget.text,"width":"","url":""};
      widgets.push(w);
      res.json(w);
    }
    else if(widget.type === "YOUTUBE"){
     // const w:Widget = new Widget(widgetId,widget.type,pageId,"","",widget.width,widget.url);
      var w  = {"_id":widgetId,"widgetType":widget.type,"pageId":pageId,
        "size":"","text":"","width":widget.width,"url":widget.url};
      widgets.push(w);
      res.json(w);
    }
    else{
      res.status(404).send({error:"widget not found "});
    }

  }

 function updateWidget(req,res){
    var widgetId = req.params["widgetId"];
    var widget = req.body;
    var update = widgets.find(function (widget) {
      return widget._id === widgetId;
    });
    if(widget.type === "YOUTUBE"){
      update.width = widget.width;
      update.url = widget.url;
      res.json(update);

    }
    else if(widget.type == "IMAGE"){
      update.text = widget.text;
      update.url = widget.url;
      update.width = widget.width;
      res.json(update);
    }
    else if(widget.type === "HEADING"){
      update.text = widget.text;
      update.size = widget.size;
      res.json(update);
    }
   else{
      res.status(404).send({error:"widget not found for page"});
    }

  }

  function deleteWidget(req,res){
    var widgetId = req.params["widgetId"];
    var w = widgets.find(function (widget) {
      return widget._id === widgetId;
    });

    if(w) {
      var index = widgets.indexOf(w);
      widgets.splice(index, 1);
      res.json(w);
    }
    else{
      res.status(404).send({error:"widget not deleted"});
    }
  }

  app.post("/api/uploads",function(req,res){
     upload(req,res,function(err) {
       if (err) {
         console.log("HELLLLL");
       }
       console.log(req.body);
       var widgetId      = req.body.widgetId;
       var width         = req.body.width;
       var myFile        = req.file;

       var userId = req.body.userId;
       var websiteId = req.body.webId;
       var pageId = req.body.pageId;

      // var originalname  = myFile.originalname; // file name on user's computer
       var filename      = myFile.filename;     // new file name in upload folder
       var path          = myFile.path;         // full path of uploaded file
       var destination   = myFile.destination;  // folder where file is saved to
       var size          = myFile.size;
       var mimetype      = myFile.mimetype;

       if(widgetId === '') {
         var  widgetId = Math.random().toString();
         var w  = {"_id":widgetId,"widgetType":"IMAGE","pageId":pageId,
           "size":"","text":"","width":width,"url":""};
         widgets.push(w);

       }

       var widget = getWidgetById(widgetId);
       widget.url = 'http://localhost:3100/uploads/' + filename;

       if(process.env.URL_PROD) {
         widget.url = process.env.URL_PROD+'/uploads/'+ filename;
       }
       
       var callbackUrl   = "http://localhost:4200/"+"/user/"+userId+"/website/"+websiteId+"/page/"+pageId+"/widget";

       res.redirect(callbackUrl);

     })
});





}
