import { Injectable } from '@angular/core';
import {BaseApi} from '../core/base-api';
import {Observable} from 'rxjs';
import {User} from '../module/user.model';
import {auth} from 'firebase';
import {AngularFireAuth} from '@angular/fire/auth';
import {AngularFireDatabase} from "@angular/fire/database";
import {UserData} from "../module/userData.model";

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
    if (this.afAuth.auth.currentUser) {
      return this.afAuth.auth.currentUser.uid;
    }
    return null;
  }

  addUserToBd(key: string, userData: UserData) {
    return this.db.object('/users/' + key).set(userData);
  }
  getUserData(): Observable<any> {
    const key = this.getUserId();
    return this.db.object('/users/' + key).valueChanges();
  }
  getUserDataByKey(key): Observable<any> {
        return this.db.object('/users/' + key).valueChanges();
  }
}
