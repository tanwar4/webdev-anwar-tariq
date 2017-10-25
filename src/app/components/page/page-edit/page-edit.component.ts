import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Router} from '@angular/router';
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
  page:Page;
  name:string;

  constructor(private route:ActivatedRoute,private router:Router,private pageService:PageService) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.userId = params['uid'];
      this.webId = params['wid'];
      this.pageId = params['pid'];
      this.pageService.findPageByWebsiteId(this.webId)
        .subscribe((pages:any)=>{
          this.pages  = pages;
        },(error:any)=>{});

      this.pageService.findPageById(this.pageId)
        .subscribe((page:any)=>{
          this.page = page;
          this.name = this.page.name;
          this.desc = this.page.description;
        },(error:any)=>{});
    });
  }

  updateWebsite(){
    this.pageService.updatePage(this.pageId,{"name":this.name,"desc":this.desc})
      .subscribe((pages:any)=>{
        this.router.navigate(['/user',this.userId,'website',this.webId,'page']);
      },(error:any)=>{});

  }

  deleteWebsite(){
    this.pageService.deletePage(this.pageId)
      .subscribe((pages:any)=>{
        this.router.navigate(['/user',this.userId,'website',this.webId,'page']);
      },(error:any)=>{});
  }

  createPage(){
    this.pageService.createPage({"name":this.name,"desc":this.desc},this.webId)
      .subscribe((pages:any)=>{},(error:any)=>{});
  }
}
