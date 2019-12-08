import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AuthComponent} from './auth.component';
import {LoginComponent} from './login/login.component';
import {RegistrationComponent} from './registration/registration.component';
import {SystemComponent} from "../system/system.component";
import {AngularFireAuthGuard, redirectLoggedInTo, } from '@angular/fire/auth-guard';

const redirectLoggedInToHome = () => redirectLoggedInTo(['system/home']);
const routes: Routes = [

      {path: '', component: AuthComponent, canActivate: [AngularFireAuthGuard], data: { authGuardPipe: redirectLoggedInToHome} , children: [
      {path: 'login', component: LoginComponent},
      {path: 'registration', component: RegistrationComponent}
    ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
