import { Component, OnInit } from '@angular/core';
import {QuestionService} from '../shared/services/question.service';
import {Question} from '../shared/models/question.model';

@Component({
  selector: 'soq-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  questions = [];
  data = [];
  constructor(
    private questionService: QuestionService,
  ) { }
  ngOnInit() {
    this.questionService.getAllUserQuestion()
      .subscribe( (data: object) => {
        console.log('data=', data);
        this.data = Object.entries(data);
        console.log('this.data=', this.data);
        let i = 0;
        for (const item in data) {
          this.questions[i] = data[item];
          this.questions[i].tags = Object.keys(this.questions[i].tags);
          i++;
        }

        console.log('this.questions=', this.questions);
      });

  };
}
