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

  constructor(
    private router: Router,
  ) {}

  ngOnInit() {
    this.router.navigate(['system/home']);
  }
}
