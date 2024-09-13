

export class DeliveryDto {
  constructor(
    public id?: string,
    public type?: string,
    public description?:string,
    public createdAt?: Date,
  ) { }
}
