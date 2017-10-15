import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {WidgetService} from "../../../../services/widget.service.client";

@Component({
  selector: 'app-widget-image',
  templateUrl: './widget-image.component.html',
  styleUrls: ['./widget-image.component.css']
})
export class WidgetImageComponent implements OnInit {
  userId:string;
  webId:string;
  pageId:string;
  text:string;
  width:string;
  url:string;
  widgetId:string;

  constructor(private route:ActivatedRoute, private widgetService:WidgetService) {
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.userId = params['uid'];
      this.webId = params['wid'];
      this.pageId = params['pid'];
      this.widgetId= params['wgid'];
    });
  }

  createWidget(){
    this.widgetService.createWidget({"type":"IMAGE","text":this.text,"width":this.width,"url":this.url},this.pageId);
  }

  deleteWidget(){
    if(this.widgetId){
      this.widgetService.deleteWidget(this.widgetId);
    }

  }
}
