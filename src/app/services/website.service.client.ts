import {Injectable} from '@angular/core';
import {Website} from '../model/website.model.client';
import {Http,Response} from '@angular/http';
import {environment} from '../../environments/environment';
import 'rxjs/Rx';


@Injectable()
export class WebsiteService{
  domain = environment.baseUrl;

  constructor(private http:Http){

  }

  findWebsiteById(websiteId:string){
    var url = this.domain+"/api/website/"+websiteId;
    return this.http.get(url)
      .map((response:Response)=>{
        return response.json();
      });
  }
  findWebsiteByUser(userId:string) {
    var url = this.domain+"/api/user/"+userId+"/website";
    return this.http.get(url)
      .map((response:Response)=>{
        return response.json();
      });
  }

  createWebsite(website:any,userId:string){
    var url = this.domain+"/api/user/"+userId+"/website";
    return this.http.post(url,website)
      .map((response:Response)=>{
        return response.json();
      });
  }

  updateWebsite(websiteId:String, website:any){
    var url = this.domain+"/api/website/"+websiteId;
    return this.http.put(url,website)
      .map((response:Response)=>{
        return response.json();
      });
  }

  deleteWebsite(websiteId:String){
    var url = this.domain+"/api/website/"+websiteId;
    return this.http.delete(url)
      .map((response:Response)=>{
        return response.json();
      });
  }

}
