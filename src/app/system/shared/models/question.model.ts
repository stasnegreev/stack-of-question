export class Question {
  constructor(
    public author: string,
    public date: string,
    public status: string,
    public tags: string [],
    public text: string,
    public title: string,
    public key?: string,
  ) {}
}

