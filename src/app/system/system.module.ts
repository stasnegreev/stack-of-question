import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SystemRoutingModule } from './system-routing.module';
import { SystemComponent } from './system.component';
import { HomeComponent } from './home/home.component';
import { CreateQuestionComponent } from './create-question/create-question.component';
import { QuestionComponent } from './question/question.component';
import {ReactiveFormsModule} from '@angular/forms';
import { EddingQuestionComponent } from './edding-question/edding-question.component';


@NgModule({
  declarations: [
    SystemComponent,
    HomeComponent,
    CreateQuestionComponent,
    QuestionComponent,
    EddingQuestionComponent,
  ],
  imports: [
    CommonModule,
    SystemRoutingModule,
    ReactiveFormsModule
  ]
})
export class SystemModule { }
