import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'formattedTimestamp'
})

export class FormattedTimestampPipe implements PipeTransform {

  transform(value: any) {
    const dt = new Date(value.seconds * 1000);
    const hr = dt.getHours();
    const m = "0" + dt.getMinutes();
    const s = "0" + dt.getSeconds();
    return hr + ':' + m.substr(-2) + ':' + s.substr(-2);
  }

}
