import {Injectable} from '@angular/core';
import {AngularFireAuth} from '@angular/fire/auth';
import {Router} from "@angular/router";
import {UserData} from "../module/userData.model";
import {observable, of, Subject} from "rxjs";
import {UserService} from "./user.service";
import {map} from "rxjs/operators";

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  public isLogged = false;
  private userId: string;
  public  userData: UserData;

  constructor(
    private afAuth: AngularFireAuth,
    private userService: UserService,
  ) {
    this.afAuth.authState
      .subscribe((auth) => {
        this.userId = auth.uid;
        if (this.userId) {
          this.userService.getUserDataByKey(this.userId)
            .subscribe((userData: UserData) => {
              this.userData = userData;
              console.log('AuthService  login this.userData=', this.userData);
              this.isLogged = true;
            });
        }
      });

  }

  login() {

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
    return of(this.isLogged);
  }
  getUserData(): UserData {
    return this.userData;
  }
}
