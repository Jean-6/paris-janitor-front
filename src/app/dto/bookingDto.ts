

export class BookingDto {
  constructor(
    public id?: string,
    public propertyId?: string,
    public userId?: string,
    public weekNumber?:number,
    public dayOfWeek?:number,
    public hourOfDay?:number,
    public createdAt?: Date,
  ) { }
}
