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
  isFilterOpen = false;
  fiterParams = {
    dateFrom: "0",
    dateTo: "999999999999999999",
    status:  ["answered", "noAnswered"],
    tags:  ["tag1", "tag2"],
  };
  constructor(
    private questionService: QuestionService,
  ) { }
  ngOnInit() {
    this.questionService.getAllUserQuestion()
      .subscribe( (data: object) => {
        console.log('data=', data);
        this.data = Object.entries(data).filter((item) => {
          if (Object.keys(item[1].tags).forEach()item[1].tags   fiterParams.tags)) {
            if (item[1].status.indexOf(this.fiterParams.status)) {
              if (item[1].date > this.fiterParams.dateFrom && item[1].date < this.fiterParams.dateTo) {
                return item;
              }
            }
          }
        });

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
  openFilter() {
    this.isFilterOpen = true;
  }
  onFilterCancel() {
    this.isFilterOpen = false;
  }
  onFilterApply(fiterParams: any) {
    this.fiterParams = fiterParams;
  }
}
