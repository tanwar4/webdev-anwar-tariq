/**
 * Created by tariq on 10/7/2017.
 */
export class Website{
  _id: string;
  name:string;
  developerId:string;
  description:string;

  constructor(_id,name,developerId,description){
    this._id = _id;
    this.developerId = developerId;
    this.description = description;
    this.name = name;
  }

}
