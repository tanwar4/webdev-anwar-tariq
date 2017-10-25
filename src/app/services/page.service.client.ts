import {Injectable} from '@angular/core';
import {Page} from "../model/page.model.client";
import {Http,Response} from '@angular/http';
import 'rxjs/Rx';

@Injectable()
export class PageService{

  domain:string  = "http://localhost:3100";

  constructor(private http:Http){

  }


  findPageByWebsiteId(websiteId:string){
    var url = this.domain+"/api/website/"+websiteId+"/page";
    return this.http.get(url)
      .map((response:Response)=>{
        return response.json();
      });
  }
  findPageById(pageId:string) {
    var url = this.domain+"/api/page/"+pageId;
    return this.http.get(url)
      .map((response:Response)=>{
        return response.json();
      });
  }

  createPage(page:any,websiteId:string){
    var url = this.domain+"/api/website/"+websiteId+"/page";
    return this.http.post(url,page)
      .map((response:Response)=>{
        return response.json();
      });
  }

  updatePage(pageId:String, page:any){
    var url = this.domain+"/api/page/"+pageId;
    return this.http.put(url,page)
      .map((response:Response)=>{
        return response.json();
      });
  }

  deletePage(pageId:String){
    var url = this.domain+"/api/page/"+pageId;
    return this.http.delete(url)
      .map((response:Response)=>{
        return response.json();
      });
  }
}
