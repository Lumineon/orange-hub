
export class User {
  constructor(
    public login: string,
    public id: number,
    public avatar_url: string,
    public name: string,
    public location: string,
    public bio: string,
    public followers: number,
    public following: number
  ) {}
}