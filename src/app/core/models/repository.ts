export class Repository {
  constructor (
      public name: string,
      public description: string,
      public created_at: Date,
      public forks_count: number,
      public watchers_count: number,
      public owner: any
  ) {}
}