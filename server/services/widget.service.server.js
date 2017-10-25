/**
 * Created by tariq on 10/21/2017.
 */
module.exports= function (app) {

  app.post("/api/page/:pageId/widget",createWidget);
  app.get("/api/page/:pageId/widget" ,findAllWidgetsForPage);
  app.get("/api/widget/:widgetId",findWidgetById);
  app.put("/api/widget/:widgetId",updateWidget);
  app.delete("/api/widget/:widgetId",deleteWidget);
 // app.put("api/page/:pageId/widget",)

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
    var widget = widgets.find(function (widget) {
      return widget._id === widgetId;
    });
    if(widget){
      res.json(widget);
    }
    else{
      res.status(404).send({error:"widget not found for page"});
    }
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

}
