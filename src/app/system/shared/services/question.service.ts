import {Injectable} from '@angular/core';
import {AngularFireAuth} from "@angular/fire/auth";
import {AngularFireDatabase, AngularFireObject } from "@angular/fire/database";
import {Question} from "../models/question.model";
import {Observable} from "rxjs";
import {map} from 'rxjs/operators';
import {CommentNew} from "../models/commentNew.model";
import {ActivatedRoute, Router} from "@angular/router";
import {FormControl} from "@angular/forms";

@Injectable({
  providedIn: 'root'
})
export class QuestionService {
  list: Observable<any>;
  itemRef: AngularFireObject<any>;
  questions: any;
  items: Observable<any[]>;
  constructor(
    private db: AngularFireDatabase,
  ) {
    this.itemRef = db.object('questions');
    this.questions = db.list('questions');
  }

  addQuestion(question: any) {
    const newPostRef = this.questions.push();
    newPostRef.set(question);
  }
  updateQuestion(key: string, question: Question) {
    this.db.object('/questions/' + key).update(question);
  }

  updateQuestionParam(key: string, param: string, value: string) {
    const obj = {};
    obj[param] = value;
    this.db.object('/questions/' + key).update(obj);
  }

  getAllQuestions() {
    return this.questions.snapshotChanges().pipe(
      map((changes: []) => {
        return changes.map((c: any) => {
          return  {...c.payload.val(), key: c.payload.key};
        });
      })
    );
  }
  getQuestionById(key: string) {
    console.log('id=', key);
    return this.db.object('/questions/' + key).valueChanges();
  }
  deleteQuestion(key: string) {
    return this.db.object('/questions/' + key).remove();

  }
  addComment(key: string, comment: CommentNew) {
    console.log('key', key);
    return this.db.list('/comments/' + key).push(comment);
  }
  getComments(k: string) {
    return this.db.list('comments/' + k).snapshotChanges().pipe(
      map((changes: []) => {
        return changes.map((c: any) => {
          return  {...c.payload.val(), key: c.payload.key};
        });
      })
    );
  }
  changeCommentStatus(questionKey: string, commentKey: string, value: string) {
    return this.db.object('/comments/' + questionKey + '/' + commentKey).update({status: value});
  }
  forbiddenTitle = (control: FormControl): Promise<any> => {
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

