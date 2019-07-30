import { PipeTransform, Pipe } from '@angular/core';
@Pipe({name: 'monthString'})

export class MonthStringPipe implements PipeTransform {
  transform(monthNum: number) {
    let months = ['jan', 'feb', 'mar', 'apr', 'may', 'jun', 'jul', 'aug', 'sep', 'oct', 'nov', 'dec'];
    return months[monthNum - 1];
  }
}
