import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Website} from "../../../model/website.model.client";
import {WebsiteService} from "../../../services/website.service.client";

@Component({
  selector: 'app-website-list',
  templateUrl: './website-list.component.html',
  styleUrls: ['./website-list.component.css']
})
export class WebsiteListComponent implements OnInit {
  userId:string;
  websites:Website[];

  constructor(private route:ActivatedRoute,private websiteService:WebsiteService) {
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.userId = params['uid'];
     // this.websites = this.websiteService.findWebsiteByUser(this.userId);
      this.websiteService.findWebsiteByUser(this.userId)
        .subscribe((website:any)=>{
          this.websites = website;
        },(error:any)=> {
          console.error("Failed to load website");
      });
    });

  }

}
