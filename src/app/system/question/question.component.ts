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
    this.questionId = this.route.snapshot.fragment;
    this.questionService.getQuestionById(this.questionId)
      .subscribe((question: Question) => {
        this.question = question;
        console.log('QuestionComponent ngOnInit question=', question);
        this.userService.getUserData()
          .subscribe((data: UserData) => {
            this.userData = data;
            console.log('QuestionComponent ngOnInit this.userData=', this.userData );
            this.checkRules();
            this.isLoaded = true;

        });
        console.log('QuestionComponent OnInit question=', this.question);

      });
    this.questionService.getComments(this.questionId)
      .subscribe((comments: any) => {
        this.comments = comments;
        this.comments.map((comment) => {
          this.userService.getUserDataByKey(comment.author)
            .subscribe((data: UserData) => comment.author = data.name);
        });
        console.log('comments=', this.comments);
      });
  }

  addComment(form: NgForm) {
    console.log('QuestionComponent addComment form', form);
    const user: string = this.userService.getUserId() + '';
    this.newComment = new CommentNew(form.value.text, this.userData.id, 'notResolve', ((new Date()) + ''));
    console.log('QuestionComponent addComment this.newComment', this.newComment);
    this.questionService.addComment(this.questionId, this.newComment).then(r => console.log('addeded comment'));
    this.textNewComment = '';
  }
  checkRules() {
    this.userService.getUserDataByKey(this.question.author)
      .subscribe((data: UserData) => {
        //if (this.authService.getUserData().status === 'admin') {
         // this.rules.delete = true;
        //}
        //if (data.name === this.authService.getUserData().name) {
          this.rules.resolveComment = true;
          this.rules.delete = true;
          this.rules.edit = true;
       // }
        console.log('QuestionComponent checkRules this.rules.edit=', this.rules);
      });
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
