import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AngularFireModule } from 'angularfire2';
import {environment} from '../environments/environment';
import {AngularFireDatabaseModule} from '@angular/fire/database';
import {AngularFireAuthModule} from '@angular/fire/auth';

import { AppComponent } from './app.component';
import {AuthModule} from './auth/auth.module';
import {FormGroup, ReactiveFormsModule} from '@angular/forms';
import {SystemModule} from './system/system.module';
import {AuthService} from './shared/services/auth.service';
import {UserService} from './shared/services/user.service';
import {AngularFireAuthGuard} from '@angular/fire/auth-guard';
import {AuthResovler} from "./shared/services/auth.resolver.service";

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AuthModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    ReactiveFormsModule,
    SystemModule,
    ReactiveFormsModule,
  ],
  providers: [
    UserService,
    AuthService,
    AngularFireAuthGuard,
    AuthResovler,
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }
