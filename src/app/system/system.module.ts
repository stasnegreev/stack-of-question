import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SystemRoutingModule } from './system-routing.module';
import { SystemComponent } from './system.component';
import { HomeComponent } from './home/home.component';
import { CreateQuestionComponent } from './create-question/create-question.component';
import { QuestionComponent } from './question/question.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { EddingQuestionComponent } from './edding-question/edding-question.component';
import { HomeFilterComponent } from './home/home-filter/home-filter.component';
import { FilterByDatePipe } from './shared/pipes/filter-by-date.pipe';
import { UserNamePipe } from './shared/pipes/user-name.pipe';


@NgModule({
  declarations: [
    SystemComponent,
    HomeComponent,
    CreateQuestionComponent,
    QuestionComponent,
    EddingQuestionComponent,
    HomeFilterComponent,
    FilterByDatePipe,
    UserNamePipe,
  ],
  imports: [
    CommonModule,
    SystemRoutingModule,
    ReactiveFormsModule,
    FormsModule,
  ]
})
export class SystemModule { }
