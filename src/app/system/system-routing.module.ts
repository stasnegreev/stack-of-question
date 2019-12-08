import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AppComponent} from '../app.component';
import {SystemComponent} from './system.component';
import {AuthGuard} from '../shared/services/auth.guard';
import {AngularFireAuthGuard, redirectUnauthorizedTo} from '@angular/fire/auth-guard';
import {HomeComponent} from "./home/home.component";
import {CreateQuestionComponent} from "./create-question/create-question.component";
import {QuestionComponent} from "./question/question.component";
import {EddingQuestionComponent} from './edding-question/edding-question.component';
import {HomeFilterComponent} from './home/home-filter/home-filter.component';
import {ProfileComponent} from "./profile/profile.component";

const redirectUnauthorizedToLogin = () => redirectUnauthorizedTo(['login']);
const routes: Routes = [
  //{path: 'system', component: SystemComponent, canActivate: [AuthGuard]},
  {path: 'system',
    component: SystemComponent,
    canActivate: [AngularFireAuthGuard],
    data: { authGuardPipe: redirectUnauthorizedToLogin},

    children: [
      {path: 'home', component: HomeComponent},
      {path: 'createQuestion', component: CreateQuestionComponent},
      {path: 'question', component: QuestionComponent},
      {path: 'eddingQuestion', component: EddingQuestionComponent},
      {path: 'profile', component: ProfileComponent},
    ]},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SystemRoutingModule { }
