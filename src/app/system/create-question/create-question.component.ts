import { Component, OnInit } from '@angular/core';
import {AbstractControl, FormControl, FormGroup, ValidatorFn, Validators} from '@angular/forms';
import {AngularFireDatabase} from '@angular/fire/database';

import {QuestionService} from "../shared/services/question.service";
import {Question} from "../shared/models/question.model";
import {QuestionNew} from "../shared/models/questionNew.model";

import {UserService} from '../../shared/services/user.service';
import {toArray} from 'rxjs/operators';
import {Router} from "@angular/router";

@Component({
  selector: 'soq-create-question',
  templateUrl: './create-question.component.html',
  styleUrls: ['./create-question.component.scss']
})
export class CreateQuestionComponent implements OnInit {

  form: FormGroup;
  questionNew: QuestionNew;
  questions: Question;

  constructor(
    private questionService: QuestionService,
    public db: AngularFireDatabase,
    private userService: UserService,
    private router: Router
  ) { }

  ngOnInit() {
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
    console.log('this.form.value=', this.form.value);
  }
  onSubmit() {
    const {title, text, tags} = this.form.value;
    const arrTags = [];
    for (const key in tags) {
      if (tags[key] === true) {
        arrTags.push(`${key}`);
      }
    }
    this.questionNew = new QuestionNew(this.userService.getUserId().uid, ((new Date()) + ''), 'notApproved', arrTags, text, title);
    console.log('push to db: ', this.questionNew);
    this.questionService.addQuestion(this.questionNew);
    this.router.navigate(['/system/home']);
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
