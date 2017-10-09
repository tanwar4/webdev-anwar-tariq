/**
 * Created by tariq on 10/7/2017.
 */
export class Widget{
  _id: String;
  name:String;
  widgetType:String;
  pageId:String;
  size:String;
  text:String;

  constructor(_id,name,widgetType,pageId,size,text){
    this._id = _id;
    this.widgetType = widgetType;
    this.pageId = pageId;
    this.name = name;
    this.size = size;
    this.text = text;
  }

}
