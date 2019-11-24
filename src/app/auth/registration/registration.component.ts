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

@Component({
  selector: 'soq-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})

export class RegistrationComponent implements OnInit {

  regForm: FormGroup;
  message: Message;

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
    const {email, password, name} = this.regForm.value;
    const user = new User(email, password, name);
    this.userService.createNewUserByEmail(user);
  }
}
