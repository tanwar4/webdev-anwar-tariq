import {Injectable} from '@angular/core';
import {User} from '../model/user.model.client';

@Injectable()
export class UserService{

  users: User[] = [
                new User("123","alice","alice","Alice","Wonder","alice@gmail.com"),
                new User("345","bob","bob","Bob","Marley","bob@gmail.com"),
                new User("567","charley","charley","Charley","Garcia","charley@gmail.com"),
                new User("789","jose","jose","Jose","Annunzi","jose@gmail.com")
  ];



  findUserByCredentials(userId: string,password:String) {
       return this.users.find(function (user) {
         return user.username === userId && user.password === password;
       });
  }

  findUserById(userId:string){
       console.log(this.users);
       return this.users.find(function (user) {
         return user._id === userId;
       });
  }
  findUserByUsername(username:string) {
      return this.users.find(function (user) {
        return user.username === username;
      });
  }

  createUser(user:User){
      const id:String = Math.random().toString();
      user._id = id;
      this.users.push(user);
      return id;
    }

  updateUser(userId:String, user:any){
   const update:User = this.users.find(function (user) {
                    return user._id === userId;
                    });
         update.username = user.username;
         update.email = user.email;
         update.firstName = user.firstName;
         update.lastName = user.lastName;
  }
  /*
   deleteUser(userId:String){
      this.update = this.users.find(function (user) {
      return user._id === userId;
      });

      this.users.splice(this.users.index(this.update),1);
  }*/

}
