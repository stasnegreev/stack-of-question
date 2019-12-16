import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Message} from '../../shared/module/message.model';
import {AuthService} from '../../shared/services/auth.service';
import {Title} from '@angular/platform-browser';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {UserService} from '../../shared/services/user.service';
import {User} from '../../shared/module/user.model';
import {auth} from 'firebase';
import {AngularFireAuth} from '@angular/fire/auth';
import {UserData} from "../../shared/module/userData.model";

@Component({
  selector: 'soq-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  message: Message;

  constructor(
    private authService: AuthService,
    private userServise: UserService,
    private title: Title,
    private router: Router,
    private route: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.title.setTitle('Login');
    this.message = new Message('', '');
    this.loginForm = new FormGroup({
        'email': new FormControl(null, [Validators.required, Validators.email]),
        'password': new FormControl(null, [Validators.required, Validators.minLength(6)])
      }
    );
    this.route.queryParams
      .subscribe((params: Params) => {
        if (params[`nowCanLogin`]) {
          this.message.showMessage('success', 'Now you can LogIn');
        }
      });
  }

  onSubmit() {
    const email = this.loginForm.value.email + '';
    const password = this.loginForm.value.password + '';
    this.userServise.signInByEmail(email, password).then(
      (result) => {
        this.userServise.getUserData()
          .subscribe((userData: UserData) => {
            if (userData) {
              this.login(userData);
            } else {
              const uId = this.userServise.getUserId();
              const newUserData = new UserData(result.user.email, 'user', uId);
              this.userServise.addUserToBd(uId, newUserData).then(
                () => {
                  console.log('onRegGoogle addUserToBd');
                  this.login(userData);
                  return;
                },
                (error) => {
                  this.message.showMessage('danger', 'Error of registration');
                  console.log('onRegGoogle promise error=', error);
                  return;
                }
              );
            }
          });
      },
      (error) => {
        this.message.showMessage('danger', error);
      }
    );

  }

  onRegGoogle() {
    this.userServise.createNewUserByGoogle().then(
      (result: any) => {
        this.userServise.getUserData()
          .subscribe((userData: UserData) => {
            if (userData) {
              this.login(userData);
            } else {
              const uId = this.userServise.getUserId();
              const newUserData = new UserData(result.user.email, 'user', uId);
              this.userServise.addUserToBd(uId, newUserData).then(
                () => {
                  console.log('onRegGoogle addUserToBd');
                  this.login(userData);
                  return;
                },
                (error) => {
                  this.message.showMessage('danger', 'Error of registration');
                  console.log('onRegGoogle promise error=', error);
                  return;
                }
              );
            }
          });
      },
      (error) => {
        this.message.showMessage('danger', error);
      }
    );
  }

  onRegFacebook() {
    this.userServise.createNewUserByFacebook().then(
      (result: any) => {
        this.userServise.getUserData()
          .subscribe((userData: UserData) => {
            if (userData) {
              this.login(userData);
            } else {
              const uId = this.userServise.getUserId();
              const newUserData = new UserData(result.user.email, 'user', uId);
              this.userServise.addUserToBd(uId, newUserData).then(
                () => {
                  console.log('onRegGoogle addUserToBd');
                  this.login(userData);
                  return;
                },
                (error) => {
                  this.message.showMessage('danger', 'Error of registration');
                  console.log('onRegGoogle promise error=', error);
                  return;
                }
              );
            }
          });
      },
      (error) => {
        this.message.showMessage('danger', error);
      }
    );
  }

  login(userData) {
    this.authService.login();
    this.router.navigate(['system/home']);
  }
}


