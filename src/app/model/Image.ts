export class Image {
  constructor(
    public id?:string,
    public propertyId?:string,
    public filename?:string,
    public fileType?:string,
    public fileSize?:number,
    public contentType?:string,
    public content?:any
  ) { }
}
