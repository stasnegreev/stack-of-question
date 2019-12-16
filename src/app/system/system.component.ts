import { Component, OnInit } from '@angular/core';
import {AuthService} from '../shared/services/auth.service';
import {UserService} from '../shared/services/user.service';
import {Title} from '@angular/platform-browser';
import {ActivatedRoute, Router} from '@angular/router';
import {UserData} from "../shared/module/userData.model";

@Component({
  selector: 'soq-system',
  templateUrl: './system.component.html',
  styleUrls: ['./system.component.scss']
})
export class SystemComponent implements OnInit {

  constructor(
    private authService: AuthService,
    private usersServise: UserService,
    private title: Title,
    private router: Router,
    private activatedRoute: ActivatedRoute,

  ) { }

  ngOnInit() {

    this.activatedRoute.data
      .subscribe((userData) => {
        console.log('tada=', userData);
      });

    this.router.navigate(['system/home']);
  }

}
