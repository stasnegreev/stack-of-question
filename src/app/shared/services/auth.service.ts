import {Injectable} from '@angular/core';
import {AngularFireAuth} from '@angular/fire/auth';
import {Router} from "@angular/router";
import {UserData} from "../module/userData.model";

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private isAuthenticated = false;
  public userId: string;
  public userName: string;
  public userStaus: string;

  constructor(
    public afAuth: AngularFireAuth,
  ) {}

  login() {
    this.isAuthenticated = true;
  }
  logout() {
    this.afAuth.auth.signOut().then(() => {
      window.localStorage.clear();
      this.isAuthenticated = false;
    }).catch((error) => {
      // An error happened.
    });
  }
  isLoggedIn(): boolean {
    return this.isAuthenticated;
  }

}
