import { Component, OnInit,ViewChild } from '@angular/core';
import {Router} from '@angular/router';
import {UserService} from '../../../services/user.service.client';
import {User} from '../../../model/user.model.client';
import {NgForm} from '@angular/forms';
import {SharedService} from "../../../services/shared.service.client";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  @ViewChild('f') loginForm: NgForm;
  username:string;
  password:string;
  errorFlag: boolean;
  errorMsg = 'Invalid username or password !';

  constructor(private router:Router,private userService:UserService, private  sharedService:SharedService) {}

  login(){
    this.username = this.loginForm.value.username;
    this.password = this.loginForm.value.password;
    /*this.userService.findUserByCredentials(this.username,this.password)
      .subscribe((data:any)=>{
          this.errorFlag = false;
          this.router.navigate(['/user/',data._id])},
        (error: any) => {
         this.errorFlag= true;
      });*/

    this.userService.login(this.username, this.password)
      .subscribe(
        (data: any) => {
          this.errorFlag = false;
          this.sharedService.user = data;
          this.router.navigate(['/profile'])},
        (error: any) => {
          this.errorFlag= true;
          console.log(error);
        }
      );

  }

  ngOnInit() {
  }

}
