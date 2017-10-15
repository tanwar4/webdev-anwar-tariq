import {Injectable} from '@angular/core';
import {Widget} from "../model/widget.model.client";

@Injectable()
export class WidgetService{

  widgets:Widget[] = [
          new Widget("123","HEADING","321",2,"Gizmodo","",""),
          new Widget("234","HEADING","321",4,"Lorem Ipsum","",""),
          new Widget("345","IMAGE","321","","","100","http://lorempixel.com/400/200/"),
          new Widget("456","HTML","321","","Html content from service","",""),
          new Widget("567","HEADING","321",4,"Lorem Ipsum","",""),
          new Widget("678","YOUTUBE","321","","","100%","https://www.youtube.com/embed/nhyc5ca3eVw"),
          new Widget("789","HTML","321","","another html contents","","")
  ];

/*  widgetType:any =[{"heading":1,"image":2,"youtube":3,"html":4}];

  getWidgetsType(){
    return this.widgetType;
  }*/

  findWidgetByPageId(pageId:string){
    return this.widgets.filter(function (widget) {
      return widget.pageId === pageId;
    });
  }
  findWidgetById(widgetId:string) {
    return this.widgets.find(function (widget) {
      return widget._id === widgetId;
    });
  }

  createWidget(widget:any,pageId:string){
    const widgetId:String = Math.random().toString();
    //set widget based on type
    if(widget.type === "HEADING"){
      const w:Widget = new Widget(widgetId,widget.type,pageId,widget.size,widget.text,"","");
      this.widgets.push(w);
    }
    else if(widget.type === "IMAGE"){
      const w:Widget = new Widget(widgetId,widget.type,pageId,"","",widget.width,widget.url);
      this.widgets.push(w);
    }
    else if(widget.type === "HTML"){
      const w:Widget = new Widget(widgetId,widget.type,pageId,"",widget.text,"","");
      this.widgets.push(w);
    }
    else if(widget.type === "YOUTUBE"){
      const w:Widget = new Widget(widgetId,widget.type,pageId,"","",widget.width,widget.url);
      this.widgets.push(w);
    }

  }

  updateWidget(widgetId:String, widget:any){
    const update:Widget = this.widgets.find(function (widget) {
      return widget._id === widgetId;
    });
    update.name = widget.name;
    update.text = widget.text;
  }

  deleteWidget(widgetId:String){
    const w:Widget = this.widgets.find(function (widget) {
      return widget._id === widgetId;
    });

    const index:number = this.widgets.indexOf(w);
    this.widgets.splice(index,1);
  }


}
