import {Injectable} from '@angular/core';
import {AngularFireAuth} from '@angular/fire/auth';
import {Router} from "@angular/router";
import {UserData} from "../module/userData.model";
import {observable, of, Subject} from "rxjs";
import {UserService} from "./user.service";

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  public isLogged = false;
  public userData: UserData;
  public subject = new Subject<UserData>();

  constructor(
    private afAuth: AngularFireAuth,
    private userService: UserService,
  ) {}

  login(userData: UserData) {
    this.userData = userData;
    this.subject.next(this.userData);
    this.isLogged = true;
    console.log('AuthService  login this.userData=', this.userData);
  }
  logout() {
    this.afAuth.auth.signOut().then(() => {
    }).catch((error) => {
      // An error happened.
    });
    this.isLogged = false;
  }
  isLoggedIn() {
    return this.isLogged;
  }
  getUserData() {
    return this.subject.asObservable();
    console.log('AuthService getUserData');
    if (this.userData) {
      console.log('AuthService getUserData return old');
      return of(this.userData);
    } else {
      this.userService.getUserData()
        .subscribe((userData: UserData) => {
          this.userData = userData;
          this.subject.next(this.userData);
          console.log('AuthService getUserData return new this.userData=', this.userData);
          return this.subject.asObservable();
        });
    }
  }
}
