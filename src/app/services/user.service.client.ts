import {Injectable} from '@angular/core';
import {Http,Response} from '@angular/http';
import {User} from '../model/user.model.client';
import { Observable } from 'rxjs/Observable';
import {environment} from '../../environments/environment';
import 'rxjs/Rx';

@Injectable()
export class UserService{

  domain = environment.baseUrl;

  constructor(private http:Http){

  }
  findUserByCredentials(userName: string,password:String):Observable<any>{
    var url = this.domain+"/api/user?username="+userName+"&password="+password;
    return this.http.get(url)
      .map((response:Response)=>{
        return response.json();
      });

  }

  findUserById(userId:string):Observable<any>{

    var url = this.domain+"/api/user/"+userId;
    return this.http.get(url)
          .map((response:Response)=>{
            return response.json();
      });

  }
  findUserByUsername(username:string) {
    var url = this.domain+"/api/user?username="+username;
    return this.http.get(url)
      .map((response:Response)=>{

        return response.json();
      });
  }

  createUser(user:any){
    var url = this.domain+"/api/user/";
    return this.http.post(url,user)
      .map((response:Response)=>{
        return response.json();
      });
    }

  updateUser(userId:string, user:any){
    var url = this.domain+"/api/user/"+userId;
      return  this.http.put(url,user)
      .map((response:Response)=>{
        return response.json();
      });


  }
  /* Not required as of now
   deleteUser(userId:String){
      this.update = this.users.find(function (user) {
      return user._id === userId;
      });

      this.users.splice(this.users.index(this.update),1);
  }*/

}
