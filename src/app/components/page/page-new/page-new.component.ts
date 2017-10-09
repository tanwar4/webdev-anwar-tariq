import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {PageService} from "../../../services/page.service.client";
import {Page} from "../../../model/page.model.client";

@Component({
  selector: 'app-page-new',
  templateUrl: './page-new.component.html',
  styleUrls: ['./page-new.component.css']
})
export class PageNewComponent implements OnInit {
  userId:string;
  webId:string;
  pages:Page[];
  name:string;
  desc:string;

  constructor(private route:ActivatedRoute,private pageService:PageService) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.userId = params['uid'];
      this.webId = params['wid'];
      this.pages = this.pageService.findPageByWebsiteId(this.webId);
    });
  }

/*  createPage(){
    this.pageService.createPage({"name":this.name,"desc":this.desc},this.webId);
  }*/
}
