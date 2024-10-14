import {Profile} from "./profile";

export class User {
  constructor(
    public id?: string,
    public username?: string,
    public email?: string,
    public password?: string,
    public createdAt?: Date,
    public roles?: string,
    public active?: boolean,
    public profile?: Profile,
  ) { }
}
