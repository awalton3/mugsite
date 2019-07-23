import { PipeTransform, Pipe } from '@angular/core';
@Pipe({name: 'standardTime'})

export class StandardTimePipe implements PipeTransform {

  transform(militaryTime: string) {
    return this.convertTime(militaryTime);
  }

  convertTime(militaryTime: string) {

    const militaryTimeArray = militaryTime.split(':');
    const hours = Number(militaryTimeArray[0]);
    const minutes = Number(militaryTimeArray[1]);

    let convertedTime = '';
    convertedTime = this.convertHours(hours);
    convertedTime += (minutes < 10) ? ":0" + minutes : ":" + minutes;
    convertedTime += (hours >= 12) ? " P.M." : " A.M.";

    return convertedTime;
  }

  convertHours(militaryHours: number) {
    let convertedHours = '';
    if (militaryHours > 0 && militaryHours <= 12) {
      convertedHours = "" + militaryHours;
    } else if (militaryHours > 12) {
      convertedHours = "" + (militaryHours - 12);
    } else if (militaryHours == 0) {
      convertedHours = "12";
    }
    return convertedHours;
  }

}
