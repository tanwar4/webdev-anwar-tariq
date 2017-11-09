import { Component, OnInit } from '@angular/core';
import {DomSanitizer,SafeResourceUrl,} from '@angular/platform-browser';
import {ActivatedRoute} from '@angular/router';
import {Widget} from "../../../model/widget.model.client";
import {WidgetService} from "../../../services/widget.service.client";

@Component({
  selector: 'app-widget-list',
  templateUrl: './widget-list.component.html',
  styleUrls: ['./widget-list.component.css']
})
export class WidgetListComponent implements OnInit {
  userId:string;
  webId:string;
  pageId:string;
  widgets:any[];
  url:string;

  constructor(private route:ActivatedRoute, private widgetService:WidgetService, private sanitizer:DomSanitizer) {
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.userId = params['uid'];
      this.webId = params['wid'];
      this.pageId = params['pid'];
      this.widgetService.findWidgetByPageId(this.pageId)
        .subscribe((widgets:any)=>{
          this.widgets = widgets;
        //  console.log(this.widgets);
        },(error:any)=>{});
    });
  }

  sanitize(url:string) {
     return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }
}
