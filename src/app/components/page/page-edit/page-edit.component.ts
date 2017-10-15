import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {PageService} from "../../../services/page.service.client";
import {Page} from "../../../model/page.model.client";

@Component({
  selector: 'app-page-edit',
  templateUrl: './page-edit.component.html',
  styleUrls: ['./page-edit.component.css']
})
export class PageEditComponent implements OnInit {
  userId:string;
  webId:string;
  pageId:string;
  desc:string;
  pages:Page[];
  name:string;

  constructor(private route:ActivatedRoute,private pageService:PageService) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.userId = params['uid'];
      this.webId = params['wid'];
      this.pageId = params['pid'];
      this.pages  = this.pageService.findPageByWebsiteId(this.webId);
    });
  }

  updateWebsite(){
    this.pageService.updatePage(this.pageId,{"name":this.name,"desc":this.desc});

  }

  deleteWebsite(){
    this.pageService.deletePage(this.pageId);
  }

  createPage(){
    this.pageService.createPage({"name":this.name,"desc":this.desc},this.webId);
  }
}
