import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {QuestionService} from "../shared/services/question.service";
import {UserService} from "../../shared/services/user.service";
import {Question} from "../shared/models/question.model";
import {CommentNew} from "../shared/models/commentNew.model";
import {UserData} from "../../shared/module/userData.model";
import {FormControl, FormGroup, NgForm, Validators} from "@angular/forms";
import {AuthService} from "../../shared/services/auth.service";

@Component({
  selector: 'soq-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.scss']
})
export class QuestionComponent implements OnInit {
  textNewComment: string;
  questionId: any;
  question: Question;
  comments: any;
  newComment: CommentNew;
  userData: UserData;
  questionAuthor: string;
  isLoaded = false;
  rules = {
    delete: false,
    edit: false,
    resolveComment: false,
  };
  commentResolve: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private questionService: QuestionService,
    private userService: UserService,
    private router: Router,
    private authService: AuthService,

  ) { }

  ngOnInit() {
    this.userData = this.authService.userData;
    this.questionId = this.route.snapshot.fragment;
    this.questionService.getQuestionById(this.questionId)
      .subscribe((question: Question) => {
        this.question = question;
        this.checkRules();
        this.userService.getUserDataByKey(question.author)
          .subscribe((userData) => {
            this.questionAuthor = userData.name;
            this.checkRules();
          });
        console.log('QuestionComponent OnInit question=', this.question);
      });
    this.questionService.getComments(this.questionId)
      .subscribe((comments: any) => {
        this.comments = comments;
        console.log('comments=', this.comments);
        this.isLoaded = true;
      });

  }

  addComment(form: NgForm) {
    console.log('QuestionComponent addComment form', form);
    this.newComment = new CommentNew(form.value.text, this.userData.id, this.userData.name,  'notResolve', ((new Date()) + ''));
    console.log('QuestionComponent addComment this.newComment', this.newComment);
    this.questionService.addComment(this.questionId, this.newComment).then(r => console.log('addeded comment'));
    this.textNewComment = '';
  }
  checkRules() {
    if (this.userData.status === 'admin') {
      this.rules.delete = true;
    }
    if (this.question.author === this.userData.id) {
      this.rules.resolveComment = true;
      this.rules.delete = true;
      this.rules.edit = true;
    }
    console.log('QuestionComponent checkRules this.rules.edit=', this.rules);
  }

  onResolve(commentKey: string, value: string) {
    console.log('event', commentKey, value);
    if (value === 'notResolve') {
      this.questionService.changeCommentStatus(this.questionId, commentKey, 'resolve')
        .then(
          () => this.ToggleQuestionStatus()
        );
      console.log('change to approve');
    }
    if (value === 'resolve') {
      this.questionService.changeCommentStatus(this.questionId, commentKey, 'notResolve')
        .then(
          () => this.ToggleQuestionStatus()
        );
      console.log('change to Not approve');
    }
  }
  ToggleQuestionStatus() {
    if (this.comments.find((comment) => comment.status === 'resolve')) {
      this.questionService.updateQuestionParam(this.questionId, 'status', 'resolve');
    } else {
      this.questionService.updateQuestionParam(this.questionId, 'status', 'notResolve');
    }
  }
  deleteQuestion() {
    this.questionService.deleteQuestion(this.questionId)
      .then(() => this.router.navigate(['/system/home']));
  }
}
