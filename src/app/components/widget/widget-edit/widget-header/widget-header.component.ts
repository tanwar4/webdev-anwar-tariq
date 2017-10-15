import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {WidgetService} from "../../../../services/widget.service.client";

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
    this.widgetService.createWidget({"type":"HEADING","text":this.text,"size":this.size},this.pageId);
  }
  deleteWidget(){
    if(this.widgetId){
      this.widgetService.deleteWidget(this.widgetId);
    }

  }
}
