import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {PageService} from "../../../services/page.service.client";
import {Page} from "../../../model/page.model.client";

@Component({
  selector: 'app-page-list',
  templateUrl: './page-list.component.html',
  styleUrls: ['./page-list.component.css']
})
export class PageListComponent implements OnInit {
  userId:string;
  webId:string;
  pages:Page[];

  constructor(private route:ActivatedRoute,private pageService:PageService) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.userId = params['uid'];
      this.webId = params['wid'];
      this.pages = this.pageService.findPageByWebsiteId(this.webId);
    });

  }
}
