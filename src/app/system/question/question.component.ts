import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {QuestionService} from "../shared/services/question.service";
import {UserService} from "../../shared/services/user.service";
import {Question} from "../shared/models/question.model";
import {CommentNew} from "../shared/models/commentNew.model";
import {UserData} from "../../shared/module/userData.model";
import {NgForm} from "@angular/forms";

@Component({
  selector: 'soq-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.scss']
})
export class QuestionComponent implements OnInit {

  questionId: any;
  question: Question;
  comments: any;
  newComment: CommentNew;
  userData: UserData;
  isLoaded = false;
  rules = {
    delete: false,
    edit: false,
    resolveComment: false,
  };

  constructor(
    private route: ActivatedRoute,
    private questionService: QuestionService,
    private userService: UserService,
  ) { }

  ngOnInit() {
    this.questionId = this.route.snapshot.fragment;
    this.questionService.getQuestionById(this.questionId)
      .subscribe((question: Question) => {
        this.question = question;
        console.log('QuestionComponent ngOnInit question=', question);
        this.userService.getUserData(question.author)
          .subscribe((data: UserData) => {
            this.userData = data;
            console.log('QuestionComponent ngOnInit this.userData=', this.userData );
            this.checkRules();
            this.isLoaded = true;

        });
        console.log('QuestionComponent OnInit question=', this.question);

      });
    this.questionService.getComments(this.questionId)
      .subscribe((d: any) => {
        this.comments = d;
        this.comments.map((i) => {
          this.userService.getUserData(i.author)
            .subscribe((data: UserData) => i.author = data.name);
        });
        console.log('comments=', this.comments);
      });

  }

  addComment(form: NgForm) {
    console.log('QuestionComponent addComment form', form);
    const user: string = this.userService.getUserId() + '';
    this.newComment = new CommentNew(form.value.text, this.userData.id, 'notApproved', ((new Date()) + ''));
    console.log('QuestionComponent addComment this.newComment', this.newComment);
    this.questionService.addComment(this.questionId, this.newComment).then(r => console.log('addeded comment'));
  }
  checkRules() {
    this.userService.getUserData(this.question.author)
      .subscribe((data: UserData) => {
        if (JSON.parse(window.localStorage.getItem('user')).status === 'admin') {
          this.rules.delete = true;
        };
        if (data.name === JSON.parse(window.localStorage.getItem('user')).name) {
          this.rules.resolveComment = true;
          this.rules.delete = true;
          this.rules.edit = true;
        }
        console.log('QuestionComponent checkRules this.rules.edit=', this.rules);
      });
  };
}
