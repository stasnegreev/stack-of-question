import {Injectable} from '@angular/core';
import {AngularFireAuth} from '@angular/fire/auth';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private isAuthenticated = false;

  constructor(
    public afAuth: AngularFireAuth
  ) {}

  login() {
    this.isAuthenticated = true;
  }
  logout() {
    this.afAuth.auth.signOut().then(() => {
      this.isAuthenticated = false;
    }).catch((error) => {
      // An error happened.
    });
  }
  isLoggedIn(): boolean {
    return this.isAuthenticated;
  }

}
