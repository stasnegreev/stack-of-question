import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {QuestionService} from '../shared/services/question.service';
import {AngularFireDatabase} from '@angular/fire/database';
import {UserService} from '../../shared/services/user.service';
import {Question} from '../shared/models/question.model';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'soq-edding-question',
  templateUrl: './edding-question.component.html',
  styleUrls: ['./edding-question.component.scss']
})
export class EddingQuestionComponent implements OnInit {

  form: FormGroup;
  questionId: any;

  constructor(
    private questionService: QuestionService,
    public db: AngularFireDatabase,
    private userService: UserService,
    private route: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.questionId = this.route.fragment;
    console.log('questionId=', this.questionId.value);
    this.questionService.getQuestionById(this.questionId.value)
      .subscribe((questions: Question[]) => {
        console.log('questions=', questions);
      });
    this.form = new FormGroup({
      'title': new FormControl(
        '',
        [Validators.required],
        [this.forbiddenTitle.bind(this)]
      ),
      'text': new FormControl(
        '',
        [Validators.required]
      ),
      'tags': new FormGroup({
        'tag1': new FormControl(''),
        'tag2': new FormControl(''),
      })
    });
  }

  onSubmit() {
    //const {title, text, tags} = this.form.value;
    //for (const key in tags) {
    //  if (tags[key] !== true) {
    //    delete tags[key];
    //  }
    //}
    //this.question = new Question(title, text, tags, ((new Date()) + ''), 'notApproved', this.userService.getUserId().uid);
    //console.log('push to db: ', this.question);
    //this.questionService.updateQuestion(this.question);
  }

  forbiddenTitle(control: FormControl): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      this.db.list('questions', ref => ref.orderByChild('title').equalTo(control.value)).valueChanges()
        .subscribe((questions: Question[]) => {
          console.log('forbiddenTitle questions=', questions);
          if (questions.length) {
            console.log('novalid');
            resolve({forbiddenTitle: true});
          } else {
            console.log('valid');
            resolve(null);
          }
          //have i to close this subscribtion?
        });
    });
  }
}
