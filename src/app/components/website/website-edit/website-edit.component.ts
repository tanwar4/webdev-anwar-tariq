import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Website} from "../../../model/website.model.client";
import {WebsiteService} from "../../../services/website.service.client";

@Component({
  selector: 'app-website-edit',
  templateUrl: './website-edit.component.html',
  styleUrls: ['./website-edit.component.css']
})
export class WebsiteEditComponent implements OnInit {
  userId:string;
  webId:string;
  desc:string;
  websites:Website[];
  website:Website;
  name:string;

  constructor(private route:ActivatedRoute,private websiteService:WebsiteService) {
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.userId = params['uid'];
      this.webId = params['wid'];
      this.websites = this.websiteService.findWebsiteByUser(this.userId);
      this.website = this.websiteService.findWebsiteById(this.webId);
      this.name = this.website.name;
      this.desc = this.website.description;
    });

  }

  updateWebsite(){
    this.websiteService.updateWebsite(this.webId,{"name":this.name,"desc":this.desc});

  }

  deleteWebsite(){
    this.websiteService.deleteWebsite(this.webId);
  }

}
