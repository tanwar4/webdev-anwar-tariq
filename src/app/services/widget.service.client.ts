import {Injectable} from '@angular/core';
import {Widget} from "../model/widget.model.client";
import {Http,Response} from '@angular/http';
import 'rxjs/Rx';

@Injectable()
export class WidgetService{

  domain:string  = "http://localhost:3100";
  constructor(private http:Http){

  }

  findWidgetByPageId(pageId:string){
    var url = this.domain+"/api/page/"+pageId+"/widget";
    return this.http.get(url)
      .map((response:Response)=>{
        return response.json();
      });
  }
  findWidgetById(widgetId:string) {
    var url = this.domain+"/api/widget/"+widgetId;
    return this.http.get(url)
      .map((response:Response)=>{
        console.log(response.json());
        return response.json();
      });
  }

  createWidget(widget:any,pageId:string){
    var url = this.domain+"/api/page/"+pageId+"/widget";
    return this.http.post(url,widget)
      .map((response:Response)=>{
        return response.json();
      });
  }

  updateWidget( widget:any,widgetId:string){
    var url = this.domain+"/api/widget/"+widgetId;
    return this.http.put(url,widget)
      .map((response:Response)=>{
        return response.json();
      });

  }

  deleteWidget(widgetId:string){
    var url = this.domain+"/api/widget/"+widgetId;
    return this.http.delete(url)
      .map((response:Response)=>{
        return response.json();
      });
  }


}
