import {Component, DoCheck, EventEmitter, OnInit, Output} from '@angular/core';
import {QuestionService} from '../shared/services/question.service';
import {Question} from '../shared/models/question.model';
import {AuthService} from "../../shared/services/auth.service";
import {UserService} from "../../shared/services/user.service";
import {UserData} from "../../shared/module/userData.model";

@Component({
  selector: 'soq-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, DoCheck {
  @Output() onFilterOpen = new EventEmitter<any>();

  isListLine = false;
  isLoaded = false;
  userStatus: string;
  questions: Question[];
  filteredQuestion: Question[];
  data = [];
  isFilterOpen = false;
  isAscending = false;
  userData: UserData;
  filterParams = {
    dateFrom: 0,
    dateTo: new Date(+new Date() + 99999999),
    status: ['resolve', 'notResolve'],
    tags: ['tag1', 'tag2', 'noTags'],
  };

  constructor(
    private questionService: QuestionService,
    private authService: AuthService,
    private userService: UserService,
  ) { }

  ngOnInit() {
    this.userData = JSON.parse(window.localStorage.getItem('user'));
    console.log('HomeComponent ngOnInit userId');
    this.questionService.getAllQuestions()
      .subscribe((questions: Question[]) => {
        console.log('HomeComponent ngOnInit questions', questions);
        this.questions = questions;
        this.onFilterApply(this.filterParams);
        this.isLoaded = true;
      });
  }
  ngDoCheck(): void {
    this.userData = JSON.parse(window.localStorage.getItem('user'));
    if (this.userData.status === 'admin') {
      this.filterParams.status.push('notApproved');
    }
  }

  openFilter() {
    this.isFilterOpen = true;
  }
  onFilterCancel() {
    this.isFilterOpen = false;
  }
  onFilterApply(filterParams: any) {
    this.filterParams = filterParams;
    let dateFrom: any;
    if (!filterParams.dateFrom) {
      console.log('this.filterParams.dateFrom', this.filterParams.dateFrom);
      dateFrom = 0;
    } else {
      console.log('this.filterParams.dateFrom', this.filterParams.dateFrom);
      dateFrom = +(new Date(filterParams.dateFrom));
    }
    let dateTo: any;
    if (!filterParams.dateTo) {
      console.log('this.filterParams.dateTo', this.filterParams.dateTo);
      dateTo = new Date(+new Date() + 99999999);
    } else {
      console.log('this.filterParams.dateTo', this.filterParams.dateTo);
      dateTo = +(new Date(filterParams.dateTo));
    }
    const status = filterParams.status;
    const tags = filterParams.tags;
    console.log('HomeComponent onFilterApply with next filterParams=', 'dateFrom', dateFrom, 'dateTo',  dateTo, 'status', status, 'tags', tags);
    this.filteredQuestion = this.questions.filter((question) => {
        if (status.indexOf(question.status) + 1) {
          if (+new Date(question.date) >= dateFrom && +new Date(question.date) <= dateTo) {
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
  deleteQuestion(event, key) {
    console.log('key', key);
    event.stopPropagation();
    this.questionService.deleteQuestion(key);
  }
  approveQuestion(event, key) {
    console.log('key', key);
    event.stopPropagation();
    this.questionService.updateQuestionParam(key, 'status', 'notResolve');
  }
  onListStyleLine() {
    this.isListLine = true;
  }
  onListStyleSquare() {
    this.isListLine = false;
  }
}
