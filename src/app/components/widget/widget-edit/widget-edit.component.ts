import { Component, OnInit } from '@angular/core';
import {WidgetService} from "../../../services/widget.service.client";
import {ActivatedRoute} from '@angular/router';
import {Widget} from "../../../model/widget.model.client";

@Component({
  selector: 'app-widget-edit',
  templateUrl: './widget-edit.component.html',
  styleUrls: ['./widget-edit.component.css']
})
export class WidgetEditComponent implements OnInit {
  userId:string;
  webId:string;
  pageId:string;
  url:string;
  widgetId:string;
  widget:Widget;

  constructor(private route:ActivatedRoute, private widgetService:WidgetService) {
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.userId = params['uid'];
      this.webId = params['wid'];
      this.pageId = params['pid'];
      this.widgetId = params['wgid'];
      this.widget = this.widgetService.findWidgetById(this.widgetId);
    });
  }
}
