export class Message {
  constructor(
    public type: string,
    public text: string,
  ) {}
  showMessage(type, text) {
    this.type = type;
    this.text = text;
    setTimeout(() => {
      this.text = '';
      console.log('timer');
    }, 3000);
  }
}
