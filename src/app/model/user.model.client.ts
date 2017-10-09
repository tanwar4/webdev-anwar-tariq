/**
 * Created by tariq on 10/7/2017.
 */
export class User{
  _id: String;
  username:String;
  password:String;
  firstName:String;
  lastName:String;
  email:String

  constructor(_id,username,password,firstName,lastName,email){
     this._id = _id;
     this.firstName = firstName;
     this.lastName = lastName;
     this.username = username;
     this.password = password;
    this.email = email;
  }
  
}
