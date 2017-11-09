/**
 * Created by tariq on 11/9/2017.
 */
import {Injectable} from '@angular/core';
import {Http,Response} from '@angular/http';
import 'rxjs/Rx';


@Injectable()
export class FlickrService{

  key = "afc3a349ce4a23b2b5e7cd58057ca057";
  secret = "84c708021b4df89b";
  urlBase = "https://api.flickr.com/services/rest/?method=flickr.photos.search&format=json&api_key=API_KEY&text=TEXT";
  
  constructor(private _http: Http) {}

  searchPhotos(searchTerm: any) {
    const url = this.urlBase
      .replace('API_KEY', this.key)
      .replace('TEXT', searchTerm);
    return this._http.get(url);
  }

}
