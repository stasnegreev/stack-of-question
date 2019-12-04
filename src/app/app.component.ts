import {Component, OnInit} from '@angular/core';

import { Observable } from 'rxjs';
import {AngularFireDatabase} from '@angular/fire/database';
import {AngularFireAuth} from '@angular/fire/auth';
import {AuthService} from './shared/services/auth.service';
import {NavigationEnd, NavigationStart, Router} from "@angular/router";
import {UserService} from "./shared/services/user.service";

@Component({
  selector: 'soq-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  private curentUrl = '';
  private isLogin: boolean;
  constructor(
    private authService: AuthService,
    private router: Router,
    public afAuth: AngularFireAuth,
  ) {}

  ngOnInit(): void {
    console.log('router=', this.router.routerState.snapshot);
    this.isLogin = this.authService.isLoggedIn();
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        console.log('Navigation End');
        this.curentUrl = this.router.routerState.snapshot.url;
        console.log('router=', this.router.routerState.snapshot.url);
      }
    });
  }
  onLogOut(){
    this.authService.logout();
    this.router.navigate(['login']);
  }
}
