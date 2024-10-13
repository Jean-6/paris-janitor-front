
export class UserSearchDto {
  constructor(
    public email?: string,
    public username?: string,
    public type?: string,
    public  status?: string,
    public role?: string,
  ) { }
}
