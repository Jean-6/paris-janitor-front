export class User {
  constructor(
    public id?: string,
    public username?: string,
    public email?: string,
    public password?: string,
    public createdAt?: Date,
    public role?: string,
    public active?: boolean,
  ) { }
}
