import {Injectable} from '@angular/core';
import {AngularFireAuth} from "@angular/fire/auth";
import {AngularFireDatabase, AngularFireObject } from "@angular/fire/database";
import {Question} from "../models/question.model";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class QuestionService {
  list: Observable<any>;
  itemRef: AngularFireObject<any>;
  questions: any;
  constructor(
    public db: AngularFireDatabase
  ) {
    this.list = db.list('questions').valueChanges();
    this.itemRef = db.object('questions');
    this.questions = db.list('questions');
  }

  addQuestion(question: Question) {
    const newPostRef = this.questions.push();
    newPostRef.set(question);
  }
  updateQuestion(key: string, question: Question) {
    this.questions.update(key, question);
  }

  getAllUserQuestion() {
    return this.list = this.db.object('questions').valueChanges();
  }
  getQuestionById(id: string) {
    console.log('id=', id);
    return this.db.object('questions').valueChanges();
  }
}

