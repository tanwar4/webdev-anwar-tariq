import { Component, OnInit ,ViewChild} from '@angular/core';
import {Router} from '@angular/router';
import {UserService} from "../../../services/user.service.client";
import {User} from "../../../model/user.model.client";
import {NgForm} from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  @ViewChild('f') registerForm: NgForm;
  username:string;
  password:string;
  password2: string;
  errorFlag: boolean;
  dupFlag: boolean;
  errorMsg = 'Password does not match !';
  dupUserMsg = 'User Already Exists';
  newuser={};

  constructor(private router:Router,private userService:UserService) {}

  register(){
    this.username = this.registerForm.value.username;
    this.password = this.registerForm.value.password;
    this.password2 = this.registerForm.value.password2;
    const user:User = this.userService.findUserByUsername(this.username);
    if(user){
        console.log(user);
        this.dupFlag = true;
    }
    else if(this.password !== this.password2) {
       this.errorFlag= true;
    }
    else{
      const newUser:User = new User("","","","","","");
      newUser.username = this.username;
      newUser.password = this.password;
      const id:String = this.userService.createUser(newUser);
      this.router.navigate(['/user/',id]);
    }
  }
  ngOnInit() {
  }

}
