import { Component, OnInit } from '@angular/core';
import {WidgetService} from "../../../../../services/widget.service.client";
import {Router} from '@angular/router';
import {ActivatedRoute} from '@angular/router';
import {FlickrService} from "../../../../../services/flickr.service.client";


@Component({
  selector: 'app-flickr-image-search',
  templateUrl: './flickr-image-search.component.html',
  styleUrls: ['./flickr-image-search.component.css']
})
export class FlickrImageSearchComponent implements OnInit {
  userId:string;
  webId:string;
  pageId:string;
  text:string;
  width:string;
  url:string;
  widgetId:string;
  upload:string;
  widget:any;
  photos:any[]=[];
  searchText:string;
 // baseURL:string = environment.baseUrl;

  constructor(private route:ActivatedRoute,private router:Router, private flickrService:FlickrService,
              private widgetService:WidgetService) {
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.userId = params['uid'];
      this.webId = params['wid'];
      this.pageId = params['pid'];
      //this.widgetId= params['wgid'];
    });
  }
  searchPhotos() {
    this.flickrService
      .searchPhotos(this.searchText)
      .subscribe(
        (data: any) => {
          console.log(data);
          let val = data._body;
          val = val.replace('jsonFlickrApi(', '');
          val = val.substring(0, val.length - 1);
          val = JSON.parse(val);
          console.log(val);
          this.photos = val.photos;
        }
      );
  }

  selectPhoto(photo) {
    let url = 'https://farm' + photo.farm + '.staticflickr.com/' + photo.server;
    url += '/' + photo.id + '_' + photo.secret + '_b.jpg';
    const widget = {
      type:"IMAGE",
      websiteId: this.webId,
      pageId: this.pageId,
      url: url

    };
      this.widgetService.createWidget(widget,this.pageId)
        .subscribe((data:any) => {
          console.log(data);
          this.router.navigate(['/user/',this.userId,'website',this.webId,'page',this.pageId,'widget',data._id]);
        });
   }


  }
