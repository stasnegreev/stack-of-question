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
import {AuthService} from "../../shared/services/auth.service";

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
    private usersServise: UserService,
    private router: Router,
    private title: Title,
    private authService: AuthService,
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
    this.usersServise.createNewUserByEmail(user)
      .then(
        (result) => {
          console.log('signUpByEmail promise result=', result);
          const uId = this.usersServise.getUserId();
          const userData = new UserData(result.user.email, 'user', uId);
          const key = result.user.uid;
          this.usersServise.addUserToBd(key, userData).then(
            () => {
              this.router.navigate(['/login'], {
                queryParams: {
                  nowCanLogin: true
                }
              });
            },
            (error) => {
              this.message.showMessage('danger', error.message);
              console.log('signUpByEmail promise error=', error);
              return;
            }
          );
        },
        (error) => {
          console.log('createNewUserByEmail error');
          this.message.showMessage('danger', error.message);
          console.log('signUpByEmail promise error=', error);
        }
      );
  }
  onRegGoogle() {
    this.usersServise.createNewUserByGoogle().then(
      (result: any) => {
        console.log('onRegGoogle result=', result);
        const uId = this.usersServise.getUserId();
        const userData = new UserData(result.user.email, 'user', uId);
        const key = result.user.uid;
        this.usersServise.addUserToBd(key, userData).then(
          () => {
            console.log('signUpByEmail addUserToBdr=');
            this.login();
            return;
          },
          (error: any) => {
            this.message.showMessage('danger', 'Error of registration');
            console.log('signUpByEmail promise error=', error);
            return;
          }
        );
      },
      (error) => console.log('promise error=', error)
    );
  }

  onRegFacebook() {
    this.usersServise.createNewUserByFacebook().then(
      (result) => {
        console.log('promise result=', result);
        this.login();
      },
      (error) => {
        console.log('promise error=', error);
        this.message.text = error.description;
      }
    );
  }
  login() {
    const uId = this.usersServise.getUserId();
    this.usersServise.getUserDataByKey(uId)
      .subscribe((userData: UserData) => {
        this.authService.login(userData);
        this.router.navigate(['system/home']);
      });
  }
}
