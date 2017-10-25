import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Router} from '@angular/router';
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

  constructor(private route:ActivatedRoute,private router:Router,private pageService:PageService) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.userId = params['uid'];
      this.webId = params['wid'];
      this.pageService.findPageByWebsiteId(this.webId)
        .subscribe((pages:any)=>{
          this.pages = pages;
        },(error:any)=>{
        });
    });
  }

  createPage(){
    this.pageService.createPage({"name":this.name,"desc":this.desc},this.webId)
       .subscribe((pages:any)=>{
         this.router.navigate(['/user',this.userId,'website',this.webId,'page']);
       },(error:any)=>{});
  }
}
