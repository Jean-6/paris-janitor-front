import { Status} from "../model/status";

export class DeliveryReqDto {
  constructor(
    public id?: string,
    public userId?: string,
    public type?: string,
    public  Status?: Status,
    public createdAt?: Date,
  ) { }
}
