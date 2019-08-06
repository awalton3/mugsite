import { PipeTransform, Pipe } from '@angular/core';
@Pipe({name: 'monthString'})

export class MonthStringPipe implements PipeTransform {
  transform(monthNum: number) {
    let months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    return months[monthNum - 1];
  }
}
