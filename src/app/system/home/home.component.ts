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
  isAscending = false;
  fiterParams = {
    dateFrom: 0,
    dateTo: new Date(+new Date() + 99999999),
    status: ["answered", "notApproved"],
    tags: ["tag1", "tag2","noTags"],
  };
  constructor(
    private questionService: QuestionService,
  ) { }

  ngOnInit() {
    this.questionService.getAllUserQuestion()
      .subscribe((questions: Question[]) => {
        this.questions = questions;
        this.onFilterApply(this.fiterParams);
      });
  }

  openFilter() {
    this.isFilterOpen = true;
  }
  onFilterCancel() {
    this.isFilterOpen = false;
  }
  onFilterApply(filterParams: any) {
    this.fiterParams = filterParams;
    const dateFrom = +(new Date(filterParams.dateFrom));
    const dateTo = +(new Date(filterParams.dateTo));
    const status = filterParams.status
    const tags = filterParams.tags;
    console.log('onFilterApply with next filterParams=', 'dateFrom', dateFrom, 'dateTo',  dateTo, 'status', status, 'tags', tags);
    this.filteredQuestion = this.questions.filter((question) => {
      if (status.indexOf(question.status) + 1) {
        console.log('status true');
        if (+new Date(question.date) >= dateFrom && +new Date(question.date) <= dateTo) {
          console.log('date true');
          if (!question.tags) {
            return tags.indexOf('noTags') + 1;

          }
          return tags.some((tag) => {
            return question.tags.indexOf(tag) + 1;
          });
        }
      }
    });
    this.onFilterCancel();
  }
  sortByData() {
    console.log('onOortByDate this.isAscending=', this.isAscending);

    this.isAscending = !this.isAscending;
    console.log('onOortByDate this.isAscending', this.isAscending);
  }
}
