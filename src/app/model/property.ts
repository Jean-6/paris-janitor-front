export class Property {
  constructor(
    public id?:string,
    public type?:string,
    public area?:number,
    public pieces?:number,
    public rent?:number,
    public description?:string,
    public address?:{
      street?:string,
      city?:string,
      zip?:string
    },
    public tel?:string,
    public userId?:string
  ) { }
}
