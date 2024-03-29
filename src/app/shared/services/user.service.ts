import { Injectable } from '@angular/core';
import {BaseApi} from '../core/base-api';
import {Observable} from 'rxjs';
import {User} from '../module/user.model';
import {auth} from 'firebase';
import {AngularFireAuth} from '@angular/fire/auth';
import {AngularFireDatabase} from "@angular/fire/database";
import {UserData} from "../module/userData.model";
import {map, take} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})

export class UserService {

  constructor(
   public afAuth: AngularFireAuth,
   public db: AngularFireDatabase,
  ) {}

  signInByEmail(email: string, password: string) {
    return this.afAuth.auth.signInWithEmailAndPassword(email, password);
  }
  createNewUserByEmail(user: User) {
    console.log('СreateNewUserByEmail user.email=', user.email);
    return this.afAuth.auth.createUserWithEmailAndPassword(user.email, user.password);
  }
  createNewUserByGoogle() {
    return this.afAuth.auth.signInWithPopup(new auth.GoogleAuthProvider()).then((result) => {
      console.log('createNewUserByGoogle result=', result);
    });
  }
  createNewUserByFacebook() {
    return this.afAuth.auth.signInWithPopup(new auth.FacebookAuthProvider());
  }
  getUserId() {
    console.log('UserService getUserId this.afAuth.auth.currentUser=', this.afAuth.auth.currentUser);
    return this.afAuth.auth.currentUser.uid;

  }

  addUserToBd(key: string, userData: UserData) {
    return this.db.object('/users/' + key).set(userData);
  }
  getUserData(): Observable<any> {
    console.log('getUserData');
    const key = this.getUserId();
    console.log('getUserData key=', key);
    return this.db.object('/users/' + key).valueChanges();
  }
  getUserDataByKey(key): Observable<any> {
    console.log('getUserData key=', key);

    return this.db.object('/users/' + key).valueChanges();
  }
}
