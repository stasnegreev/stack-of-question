import { Injectable } from '@angular/core';
import {BaseApi} from '../core/base-api';
import {Observable} from 'rxjs';
import {User} from '../module/user.model';
import {auth} from 'firebase';
import {AngularFireAuth} from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})

export class UserService {

 constructor(
   public afAuth: AngularFireAuth,
 ) {}
  user: User;
  signInByEmail(email: string, password: string) {
    return this.afAuth.auth.signInWithEmailAndPassword(email, password);
  }
  createNewUserByEmail(user: User) {
    return this.afAuth.auth.createUserWithEmailAndPassword(user.email, user.password);
  }
  createNewUserByGoogle() {
    return this.afAuth.auth.signInWithPopup(new auth.GoogleAuthProvider());
  }
  createNewUserByFacebook() {
    return this.afAuth.auth.signInWithPopup(new auth.FacebookAuthProvider());
  }
  getUserId() {
    return this.afAuth.auth.currentUser;
  }

}
