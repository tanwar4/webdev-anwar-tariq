import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {ActivatedRoute} from '@angular/router';
import {Website} from "../../../model/website.model.client";
import {WebsiteService} from "../../../services/website.service.client";

@Component({
  selector: 'app-website-new',
  templateUrl: './website-new.component.html',
  styleUrls: ['./website-new.component.css']
})
export class WebsiteNewComponent implements OnInit {
  userId:string;
  websites:any[];
  name:string;
  desc:string;

  constructor(private route:ActivatedRoute,private router:Router,private websiteService:WebsiteService) {
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.userId = params['uid'];
      this.websiteService.findWebsiteByUser(this.userId)
        .subscribe((websites:any)=> {
          this.websites = websites;
        }, (error:any) =>
        {error.log("failed to delete website")});
    });
  }

  addWebsite(){
    if(this.name) {
      this.websiteService.createWebsite({"name":this.name, "developerId":this.userId,"description":this.desc},this.userId)
        .subscribe((data:any)=> {
          this.router.navigate(['/user',this.userId,'website']);

    }, (error:any) =>
                {error.log("failed to delete website")});
    }
  }

}
