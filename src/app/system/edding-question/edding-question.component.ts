import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {QuestionService} from '../shared/services/question.service';
import {AngularFireDatabase} from '@angular/fire/database';
import {UserService} from '../../shared/services/user.service';
import {Question} from '../shared/models/question.model';
import {ActivatedRoute, Router} from '@angular/router';
import {Observable, Subject} from "rxjs";
import {UserData} from "../../shared/module/userData.model";

@Component({
  selector: 'soq-edding-question',
  templateUrl: './edding-question.component.html',
  styleUrls: ['./edding-question.component.scss']
})
export class EddingQuestionComponent implements OnInit {

  form: FormGroup;
  questionId: string;
  question: Question;


  constructor(
    private questionService: QuestionService,
    public db: AngularFireDatabase,
    private userService: UserService,
    private route: ActivatedRoute,
    private router: Router,
  ) { }

  ngOnInit() {
    this.questionId = this.route.snapshot.fragment;
    console.log('questionId=', this.questionId);
    this.questionService.getQuestionById(this.questionId)
      .subscribe((question: Question) => {
        this.question = question;
        console.log('EddingQuestionComponent question to edit on init=', this.question);
        this.form.patchValue({
          'title': this.question.title,
          'text': this.question.text,
          'tags': {
            'tag1': this.question.tags.indexOf('tag1') + 1,
            'tag2': this.question.tags.indexOf('tag2') + 1,
          }
        });
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
    console.log('EddingQuestionComponent this.form.value update=', this.form.value);
    const {title, text, tags} = this.form.value;
    this.question.title = title;
    this.question.text = text;
    const arrTags = [];
    for (const key in tags) {
      if (tags[key]) {
        arrTags.push(`${key}`);
      }
    }
    console.log('EddingQuestionComponent arrTags update=', arrTags);
    this.question.tags = arrTags;
    console.log('EddingQuestionComponent this.question update=', this.question);
    this.questionService.updateQuestion(this.questionId, this.question);
    this.router.navigate(['/system/question'], {fragment: this.questionId});
  }

  forbiddenTitle(control: FormControl): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      this.db.list('questions', ref => ref.orderByChild('title').equalTo(control.value)).valueChanges()
        .subscribe((questions: Question[]) => {
          console.log('forbiddenTitle questions=', questions);
          if (questions.length) {
            if (questions[0].title !== this.question.title) {
              console.log('novalid', questions);
              resolve({forbiddenTitle: true});
            }

          } else {
            console.log('valid');
            resolve(null);
          }
          //have i to close this subscribtion?
        });
    });
  }


}
