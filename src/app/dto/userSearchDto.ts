
export class UserSearchDto {
  constructor(
    public email?: string,
    public username?: string,
    public  status?: boolean,
    public role?: string,
  ) { }
}
