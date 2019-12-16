import { Component, OnInit } from '@angular/core';
import {UserData} from "../../shared/module/userData.model";
import {AuthService} from "../../shared/services/auth.service";

@Component({
  selector: 'soq-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  userData: UserData;

  constructor(
    private authService: AuthService,
  ) { }

  ngOnInit() {
    this.userData = this.authService.userData;
  }

}
