import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Router} from '@angular/router';
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

  constructor(private route:ActivatedRoute, private router:Router ,private websiteService:WebsiteService) {
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.userId = params['uid'];
      this.webId = params['wid'];
      this.websiteService.findWebsiteByUser(this.userId)
        .subscribe((websites:any)=> {
          this.websites = websites;
        }, (error:any) =>
        {error.log("failed to update website")});

      this.websiteService.findWebsiteById(this.webId)
        .subscribe((website:any)=> {
          this.website =  website;
          this.name = this.website.name;
          this.desc = this.website.description;
        }, (error:any) =>
        {console.log("failed to update website")});


    });

  }

  updateWebsite(){
    this.websiteService.updateWebsite(this.webId,{"name":this.name,"desc":this.desc})
      .subscribe((data:any)=> {
        this.router.navigate(['/user/',this.userId,'website']);
      }, (error:any) =>
               {console.log("failed to update website")});

  }

  deleteWebsite(){
    this.websiteService.deleteWebsite(this.webId)
      .subscribe((data:any)=> {
        this.router.navigate(['/user/',this.userId,'website']);

      }, (error:any) =>
                {console.log("failed to delete website")});
  }

}
