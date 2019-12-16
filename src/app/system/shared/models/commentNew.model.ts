export class CommentNew {
  constructor(
    public text: string,
    public authorID: string,
    public author: string,
    public status: string,
    public date: string,
  ) {}
}
