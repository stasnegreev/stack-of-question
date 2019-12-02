import { Component, OnInit } from '@angular/core';
import {QuestionService} from '../shared/services/question.service';
import {Question} from '../shared/models/question.model';
import {forEachComment} from "tslint";

@Component({
  selector: 'soq-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  questions: Question[];
  filteredQuestion: Question[];
  data = [];
  isFilterOpen = false;
  fiterParams = {
    dateFrom: "2019-11-01",
    dateTo: "2019-12-01",
    status: ["answered", "notApproved"],
    tags: ["tag1", "tag2"],
  };
  constructor(
    private questionService: QuestionService,
  ) { }

  ngOnInit() {
    this.questionService.getAllUserQuestion()
      .subscribe((questions: Question[]) => {
        this.questions = questions;
        this.filteredQuestion = this.questions.filter((question) => {
          if (this.fiterParams.status.indexOf(question.status) + 1) {
            console.log('status true');
            return true;
          }
        });
        this.filteredQuestion = this.filteredQuestion.filter((question) => {
          if (!question.tags) {
            return false;
          }
          return this.fiterParams.tags.some((tag) => {
            return question.tags.indexOf(tag) + 1;
          });
        });
        console.log('questions=', this.questions);
        console.log('fiterParams=', this.fiterParams);
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
    console.log('fiterParams from filter form', fiterParams)
    this.filteredQuestion = this.questions.filter((question) => {
      console.log('this.fiterParams.status=', this.fiterParams.status, 'question.status=', question.status, '1', this.fiterParams.status.indexOf(question.status));
      if (this.fiterParams.status.indexOf(question.status) + 1) {
        console.log('status true');
        return true;
      }
    });
    this.filteredQuestion = this.filteredQuestion.filter((question) => {
      if (+new Date(question.date) > +(new Date(this.fiterParams.dateFrom)) && +new Date(question.date) < +(new Date(this.fiterParams.dateTo))) {
        console.log('date true');
        return true;
      }
    });
    this.filteredQuestion = this.filteredQuestion.filter((question) => {
      if (!question.tags) {
        return false;
      }
      return this.fiterParams.tags.some((tag) => {
        return question.tags.indexOf(tag) + 1;
      });
    });
  }
}
