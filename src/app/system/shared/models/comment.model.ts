export class Comment {
  constructor(
    public text: string,
    public author: string,
    public status: string,
    public date: string,
    public key?: string,
  ) {}
}
