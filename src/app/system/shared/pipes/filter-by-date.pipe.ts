import { Pipe, PipeTransform } from '@angular/core';
import {Question} from "../models/question.model";

@Pipe({
  name: 'soqFilterByDate',
})
export class FilterByDatePipe implements PipeTransform {

  transform(value: any, isAscending: boolean = true): [] {
    return value.sort( (question1: Question, question2: Question) => {
      if (+new Date(question1.date) > +new Date(question2.date)) {
        if (isAscending) {
          return 1;
        } else {
          return -1;
        }
      } else {
        if (isAscending) {
          return -1;
        } else {
          return 1;
        }
      }
    });
  }

}
