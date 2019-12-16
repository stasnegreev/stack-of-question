import { Component, OnInit } from '@angular/core';
import {UserData} from "../../shared/module/userData.model";
import {AuthService} from "../../shared/services/auth.service";
import {ActivatedRoute, NavigationEnd, Router} from "@angular/router";
import {UserService} from "../../shared/services/user.service";
import {AngularFireAuth} from "@angular/fire/auth";

@Component({
  selector: 'soq-systemHeader',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  userData: UserData;
  isLoaded = false;
  private curentUrl = '';
  private isLogin: boolean;

  constructor(
    private authService: AuthService,
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService,
    public afAuth: AngularFireAuth,
    private activatedRoute: ActivatedRoute,
  ) {}



  ngOnInit() {
    this.curentUrl = this.route.children[0].routeConfig.path;
    this.router.events
      .subscribe(event => {
        if (event instanceof NavigationEnd) {
          this.curentUrl = this.route.children[0].routeConfig.path;
        }
      });

  }

  onLogOut() {
    this.authService.logout();
    this.router.navigate(['login']);
  }
}
