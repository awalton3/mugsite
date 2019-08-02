import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'truncate'
})

export class TruncatePipe implements PipeTransform {

  transform(value: string, charLimit: number) {
    return value.length <= charLimit ?  value : value.slice(0, charLimit - 1) + '...'; 
  }

}
