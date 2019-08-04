import { PipeTransform, Pipe } from '@angular/core';
@Pipe({name: 'twoDigitDate'})

export class TwoDigitDatePipe implements PipeTransform {
  transform(date: number) {
    return (date + '').length === 1 ? '0' + date : date;
  }
}
