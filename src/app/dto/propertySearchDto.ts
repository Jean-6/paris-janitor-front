import {Status} from "../model/status";

export class PropertySearchDto {
  constructor(
    public type?: string,
    public location?: Date,
    public minBudget?: Date,
    public maxBudget?: Status
  ) { }
}
