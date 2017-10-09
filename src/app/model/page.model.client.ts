/**
 * Created by tariq on 10/7/2017.
 */
/**
 * Created by tariq on 10/7/2017.
 */
export class Page{
  _id: String;
  name:String;
  websiteId:String;
  description:String;

  constructor(_id,name,websiteId,description){
    this._id = _id;
    this.websiteId = websiteId;
    this.description = description;
    this.name = name;
  }

}
