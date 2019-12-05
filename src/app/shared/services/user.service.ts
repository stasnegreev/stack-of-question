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
    console.log('reateNewUserByEmail user.email=', user.email);
    return this.afAuth.auth.createUserWithEmailAndPassword(user.email, user.password);
  }
  createNewUserByGoogle() {
    return this.afAuth.auth.signInWithPopup(new auth.GoogleAuthProvider());
  }
  createNewUserByFacebook() {
    return this.afAuth.auth.signInWithPopup(new auth.FacebookAuthProvider());
  }
  getUserId() {
    return this.afAuth.auth.currentUser.uid;
  }

  addUserToBd(key: string, userData: UserData) {
    return this.db.object('/users/' + key).set(userData);
  }
  getUserData(key: string): Observable<any> {
    return this.db.object('/users/' + key).valueChanges();
  }
}
