export class Question {
  constructor(
    public author: string,
    public date: string,
    public status: string,
    public tags: {
      tag1?: boolean;
      tag2?: boolean;
    },
    public text: string,
    public title: string,
    public key?: string,
  ) {}
}

