import { Component, OnInit,ViewChild } from '@angular/core';
import {Router} from '@angular/router';
import {UserService} from '../../../services/user.service.client';
import {User} from '../../../model/user.model.client';
import {NgForm} from '@angular/forms';

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

  constructor(private router:Router,private userService:UserService) {}

  login(){
    this.username = this.loginForm.value.username;
    this.password = this.loginForm.value.password;
    const user:User = this.userService.findUserByCredentials(this.username,this.password);
    if(user){
      this.router.navigate(['/user/',user._id]);
    }
    else this.errorFlag= true;
  }

  ngOnInit() {
  }

}
