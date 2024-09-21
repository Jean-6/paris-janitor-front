import {Status} from "../model/status";

export class DeliveryReqSearchDto {
  constructor(
    public type?: string,
    public startDate?: Date,
    public endDate?: Date,
    public status?: Status
  ) { }
}
