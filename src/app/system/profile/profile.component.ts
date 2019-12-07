import { Component, OnInit } from '@angular/core';
import {UserData} from "../../shared/module/userData.model";

@Component({
  selector: 'soq-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  userData: UserData;

  constructor() { }

  ngOnInit() {
    this.userData = JSON.parse(window.localStorage.getItem('user'));
  }

}
