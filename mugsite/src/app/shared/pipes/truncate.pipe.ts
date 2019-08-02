import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'truncate'
})

export class TruncatePipe implements PipeTransform {

  transform(value: string, charLimit: number) {
    const valueArr = [...value];
    if (valueArr.length <= charLimit) {
      return value;
    } else {
      const truncatedArr = valueArr.slice(0, charLimit - 1);
      return truncatedArr.join('') + '...';
    }
  }

}
