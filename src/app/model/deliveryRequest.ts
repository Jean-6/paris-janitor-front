import {Stage} from "./stage";
import {Profile} from "./profile";


export class DeliveryRequest {
  constructor(
    public propertyId?: string,
    public type?: string,
    public description?: string,
    public userId?: string,
    public stage:Stage[]=[],
    public createdAt?: Date,
    public userProfile?:Profile,

  ) { }
}
