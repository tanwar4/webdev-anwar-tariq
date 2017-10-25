import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Router} from '@angular/router';
import {WidgetService} from "../../../../services/widget.service.client";
import {Widget} from "../../../../model/widget.model.client";

@Component({
  selector: 'app-widget-header',
  templateUrl: './widget-header.component.html',
  styleUrls: ['./widget-header.component.css']
})
export class WidgetHeaderComponent implements OnInit {
  userId:string;
  webId:string;
  pageId:string;
  text:string;
  size:string;
  widgetId:string;
  widget:any;

  constructor(private route:ActivatedRoute,private router:Router, private widgetService:WidgetService) {
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.userId = params['uid'];
      this.webId = params['wid'];
      this.pageId = params['pid'];
      this.widgetId=params['wgid'];
    });
    if(this.widgetId){
      this.widgetService.findWidgetById(this.widgetId)
        .subscribe((widget:any)=>{
          this.widget = widget;
          this.size= this.widget.size;
          this.text = this.widget.text;
        },(error:any)=>{});

    }
  }

  createWidget(){
    if(this.widgetId){
      this.widgetService.updateWidget({"type":"HEADING","text":this.text,"size":this.size},this.widgetId)
        .subscribe((widgets:any)=>{
          this.router.navigate(['/user/',this.userId,'website',this.webId,'page',this.pageId,'widget']);
        },(error:any)=>{});
    }
    else {
      this.widgetService.createWidget({"type": "HEADING", "text": this.text, "size": this.size}, this.pageId)
        .subscribe((widgets:any)=>{
          this.router.navigate(['/user/',this.userId,'website',this.webId,'page',this.pageId,'widget']);
        },(error:any)=>{});
    }
  }
  deleteWidget(){
    if(this.widgetId){
      this.widgetService.deleteWidget(this.widgetId)
        .subscribe((widgets:any)=>{
          this.router.navigate(['/user/',this.userId,'website',this.webId,'page',this.pageId,'widget']);
        },(error:any)=>{});
    }

  }
}
