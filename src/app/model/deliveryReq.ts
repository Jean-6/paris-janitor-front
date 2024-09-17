import { Status} from "./status";

export class DeliveryReq {
  constructor(
    public userId?: string,
    public propertyId?: string,
    public type?: string,
    public  status?: Status,
    public createdAt?: Date,
  ) { }
}
