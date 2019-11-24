export class Question {
  constructor(
    public title: string,
    public text: string,
    public tags: string[],
    public date: string,
    public status: string,
    public author: string,
  ) {}
}
