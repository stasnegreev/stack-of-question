import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {User} from '../../shared/module/user.model';
import {Title} from '@angular/platform-browser';
import {Router} from '@angular/router';
import {UserService} from '../../shared/services/user.service';
import {Message} from '../../shared/module/message.model';
import {Observable} from 'rxjs';
import {AngularFireAuth} from '@angular/fire/auth';
import {auth} from 'firebase';
import {UserData} from "../../shared/module/userData.model";

@Component({
  selector: 'soq-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})

export class RegistrationComponent implements OnInit {

  regForm: FormGroup;
  message: Message;
  user: User;
  constructor(
    private userService: UserService,
    private router: Router,
    private title: Title,
  ) { }

  ngOnInit() {

    this.title.setTitle('Registration');
    this.message = new Message('','');
    this.regForm = new FormGroup({
      'email': new FormControl(null, [Validators.required, Validators.email]),
      'password': new FormControl(null, [Validators.required, Validators.minLength(6)]),
    });
  }

  onSubmit() {
    console.log('this.regForm.value=', this.regForm.value);
    const {email, password} = this.regForm.value;
    console.log('email=', email, 'password', password);
    const user = new User(email, password);
    console.log('user=', user);
    this.userService.createNewUserByEmail(user).then(
      (result) => {
        console.log('signUpByEmail promise result=', result);
        const userData = new UserData(result.user.email, 'admin');
        const key = result.user.uid;
        this.userService.addUserToBd(key, userData).then(
          () => {
            return;
          },
          (error) => {
            this.message.showMessage('danger', 'Error of registration');
            console.log('signUpByEmail promise error=', error);
            return;
          }
        );
        this.router.navigate(['/login'], {
          queryParams: {
            nowCanLogin: true
          }
        });
      },
      (error) => {
        this.message.showMessage('danger', 'Error of registration');
        console.log('signUpByEmail promise error=', error);
      }
    );
  }
}
