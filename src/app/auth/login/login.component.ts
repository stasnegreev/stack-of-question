import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Message} from '../../shared/module/message.model';
import {AuthService} from '../../shared/services/auth.service';
import {Title} from '@angular/platform-browser';
import {Router} from '@angular/router';
import {UserService} from '../../shared/services/user.service';
import {User} from '../../shared/module/user.model';
import {auth} from 'firebase';
import {AngularFireAuth} from '@angular/fire/auth';

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
    private usersServise: UserService,
    private title: Title,
    private router: Router,
  ) { }

  ngOnInit() {
    this.title.setTitle('Login');
    this.message = new Message('', '');
    this.loginForm = new FormGroup({
        'email': new FormControl(null, [Validators.required, Validators.email]),
        'password': new FormControl(null, [Validators.required, Validators.minLength(6)])
      }
    );
  }

  onSubmit() {
    const email = this.loginForm.value.email + '';
    const password = this.loginForm.value.password + '';
    this.usersServise.signInByEmail(email, password).then(
      (result) => {
        console.log('signInByEmail result=', result);
        this.login(result);
      },
      (error) => console.log('promise error=', error)
    );

  }

  onRegGoogle() {
    this.usersServise.createNewUserByGoogle().then(
      (result) => {
        console.log('onRegGoogle result=', result);
        this.login(result);
      },
      (error) => console.log('promise error=', error)
    );
  }

  onRegFacebook() {
    this.usersServise.createNewUserByFacebook().then(
      (result) => {
        console.log('promise result=', result);
        this.login(result);
      },
      (error) => {
        console.log('promise error=', error);
        this.message.text = error.description;
      }
    );
  }

  login(result) {
    if (result.user.emailVerified) {
      console.log('user.emailVerified');
      //let user: User;
      //user.email = result.user.email;
      console.log('result.user.email=', result.user.email);
      this.authService.login();
      this.router.navigate(['system/home']);
    } else {
      this.message.text = 'Не удалось выполнить вход';
    }
  }
}


