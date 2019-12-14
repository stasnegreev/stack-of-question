import {Component, DoCheck, OnChanges, OnInit} from '@angular/core';

import { Observable } from 'rxjs';
import {AngularFireDatabase} from '@angular/fire/database';
import {AngularFireAuth} from '@angular/fire/auth';
import {AuthService} from './shared/services/auth.service';
import {NavigationEnd, NavigationStart, Router} from "@angular/router";
import {UserService} from "./shared/services/user.service";
import {UserData} from "./shared/module/userData.model";

@Component({
  selector: 'soq-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  userData: UserData;
  isLoaded = false;
  private curentUrl = '';
  private isLogin: boolean;

  constructor(
    private authService: AuthService,
    private router: Router,
    private userService: UserService,
    public afAuth: AngularFireAuth,
  ) {}



  ngOnInit() {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.curentUrl = this.router.routerState.snapshot.url;
      }
    });
    this.authService.getUserData()
      .subscribe((userData: UserData) => {
        this.userData = userData;
        console.log('AppComponent ngOnInit authService.getUserData userData=', userData);
      });
    this.router.navigate(['system/home']);
  }

  onLogOut() {
    this.authService.logout();
    this.router.navigate(['login']);
  }
}
