import {Injectable} from '@angular/core';
import {Website} from '../model/website.model.client';

@Injectable()
export class WebsiteService{

  websites: Website[] = [
    new Website("123","facebook","345","A social networking site"),
    new Website("234","facebook","345","A social networking site"),
    new Website("456","facebook","345","A social networking site"),
    new Website("567","facebook","789","A social networking site")
  ];


  findWebsiteById(websiteId:string){
    return this.websites.find(function (website) {
      return website._id === websiteId;
    });
  }
  findWebsiteByUser(userId:string) {
    return this.websites.filter(function (website) {
      return website.developerId === userId;
    });
  }

  createWebsite(website:Website){
   const webId:string = Math.random().toString();
    website._id = webId;
    this.websites.push(website);
  }

  updateWebsite(websiteId:String, website:any){
    const update:Website = this.websites.find(function (website) {
      return website._id === websiteId;
    });
    update.name = website.name;
    update.description= website.desc;
  }

  deleteWebsite(websiteId:String){
    const w:Website = this.websites.find(function (website) {
      return website._id === websiteId;
    });

    const index:number = this.websites.indexOf(w);
    this.websites.splice(index,1);
  }

}
