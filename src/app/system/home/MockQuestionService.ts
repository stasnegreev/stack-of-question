import {UserData} from '../../shared/module/userData.model';
import {Question} from "../shared/models/question.model";
import {of} from "rxjs";


export class MockQuestionService {
  private  questions: Question[] = [
    {
      author: 'paA69HIeEcbkI6fFt1elD7yB0053',
      date: 'Sat Dec 07 2019 11:14:26 GMT+0300 (Москва, стандартное время)',
      status: 'resolve',
      tags: [],
      text: 'klvflkfdlkdfblkfdnblkfdn',
      title: 'Admin new',
    },
    {
      author: 'sHamf92GfsUr8SOlDhDjFqxS8Le2',
      date: 'Fri Dec 13 2019 10:09:57 GMT+0300 (Москва, стандартное время)',
      status: 'resolve',
      tags: ['tag1', 'tag2'],
      text: 'afdsa',
      title: 'Stas',
    }
  ];
  constructor() {}
  getAllQuestions() {
    return of(this.questions);
  }
}
