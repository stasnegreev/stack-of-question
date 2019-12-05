import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'soqUserName'
})
export class UserNamePipe implements PipeTransform {

  transform(value: string): string {
    return value.slice(0, value.indexOf('@'));
  }

}
