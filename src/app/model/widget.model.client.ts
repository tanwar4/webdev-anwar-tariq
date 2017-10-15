/**
 * Created by tariq on 10/7/2017.
 */
export class Widget{
  _id: string;
  name:string;
  widgetType:string;
  pageId:string;
  size:string;
  text:string;
  width:string;
  url:string;

  constructor(_id,widgetType,pageId,size,text,width,url){
    this._id = _id;
    this.widgetType = widgetType;
    this.pageId = pageId;
    this.size = size;
    this.text = text;
    this.width = width;
    this.url = url;
  }

}
