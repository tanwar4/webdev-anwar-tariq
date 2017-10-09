import {Injectable} from '@angular/core';
import {Page} from "../model/page.model.client";

@Injectable()
export class PageService{

  pages: Page[] = [
    new Page("321","post1","123","Lorem Ipsum"),
    new Page("432","Blog1","123","Lorem Ipsum"),
    new Page("543","post3","123","Lorem Ipsum")
  ];


  findPageByWebsiteId(websiteId:string){
    return this.pages.filter(function (page) {
      return page.websiteId === websiteId;
    });
  }
  findPageById(pageId:string) {
    return this.pages.find(function (page) {
      return page._id === pageId;
    });
  }

  createPage(page:any,websiteId:string){
    const pageId:String = Math.random().toString();
    const p:Page =new Page(pageId,page.name,websiteId,page.desc);
    this.pages.push(p);
  }

/*  updatePage(pageId:String, Page:any){
    update:Page = this.pages.find(function (page) {
      return page._id === pageId;
    });
    update.name = page.name;
    update.websiteId = page.webid;
    update.description= page.desc;
  }

  deletePage(pageId:String){

     p:Page = this.pages.find(function (page) {
      return page._id === pageId;
    });

    index:Number = this.pages.index(p);
    this.pages.splice(index,1);
  }*/
}
