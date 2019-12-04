import {Injectable} from '@angular/core';
import {AngularFireAuth} from "@angular/fire/auth";
import {AngularFireDatabase, AngularFireObject } from "@angular/fire/database";
import {Question} from "../models/question.model";
import {Observable} from "rxjs";
import {map} from 'rxjs/operators';
import {CommentNew} from "../models/commentNew.model";

@Injectable({
  providedIn: 'root'
})
export class QuestionService {
  list: Observable<any>;
  itemRef: AngularFireObject<any>;
  questions: any;
  items: Observable<any[]>;
  constructor(
    public db: AngularFireDatabase
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
  getAllUserQuestion() {
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
  getUserNameByUserId(userId: string) {
    
  }

}

