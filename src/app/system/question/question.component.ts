import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {QuestionService} from "../shared/services/question.service";
import {UserService} from "../../shared/services/user.service";
import {Question} from "../shared/models/question.model";
import {CommentNew} from "../shared/models/commentNew.model";

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
        console.log('QuestionComponent OnInit question=', this.question);

      });
    this.questionService.getComments(this.questionId)
      .subscribe((d: any) => {
        this.comments = d;
        console.log('comments=', this.comments);
      });
  }

  addComment() {
    console.log('this.questionId', this.questionId);
    const user: string = this.userService.getUserId() + '';
    console.log('', user);
    this.newComment = new CommentNew('kjcvkljdfblkjdfbk', user, 'new', ((new Date()) + ''));
    this.questionService.addComment(this.questionId, this.newComment).then(r => console.log('addeded comment'));
  }

}
