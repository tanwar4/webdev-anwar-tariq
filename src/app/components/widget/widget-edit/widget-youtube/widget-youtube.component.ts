import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Router} from '@angular/router';
import {WidgetService} from "../../../../services/widget.service.client";
import {Widget} from "../../../../model/widget.model.client";

@Component({
  selector: 'app-widget-youtube',
  templateUrl: './widget-youtube.component.html',
  styleUrls: ['./widget-youtube.component.css']
})
export class WidgetYoutubeComponent implements OnInit {
  userId:string;
  webId:string;
  width:string;
  pageId:string;
  url:string;
  widgetId:string;
  widget:any;

  constructor(private route:ActivatedRoute,private router:Router,private widgetService:WidgetService) {
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
            this.width=this.widget.width;
            this.url = this.widget.url;
        },(error:any)=>{

        });

    }
  }

  createWidget(){
    if(this.widgetId){
      this.widgetService.updateWidget({"type": "YOUTUBE", "width": this.width, "url": this.url},this.widgetId)
        .subscribe((widgets:any)=>{
          this.router.navigate(['/user/',this.userId,'website',this.webId,'page',this.pageId,'widget']);
        },(error:any)=>{});
    }
    else {
      this.widgetService.createWidget({"type": "YOUTUBE", "width": this.width, "url": this.url}, this.pageId)
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
