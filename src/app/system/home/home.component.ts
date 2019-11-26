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
      .subscribe((d: Question[]) => {
        this.questions = d;

        console.log('questions=', this.questions);
      });
  }

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
