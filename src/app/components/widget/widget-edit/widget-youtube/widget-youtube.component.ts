import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {WidgetService} from "../../../../services/widget.service.client";

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

  constructor(private route:ActivatedRoute, private widgetService:WidgetService) {
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.userId = params['uid'];
      this.webId = params['wid'];
      this.pageId = params['pid'];
      this.widgetId=params['wgid'];
    });
  }

  createWidget(){
    this.widgetService.createWidget({"type":"YOUTUBE","width":this.width,"url":this.url},this.pageId);
  }

  deleteWidget(){
    if(this.widgetId){
      this.widgetService.deleteWidget(this.widgetId);
    }

  }

}
