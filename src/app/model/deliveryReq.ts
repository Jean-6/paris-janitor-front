import { Status} from "./status";

export class DeliveryReq {
  constructor(
    public id?: string,
    public userId?: string,
    public type?: string,
    public  Status?: Status,
    public createdAt?: Date,
  ) { }
}
