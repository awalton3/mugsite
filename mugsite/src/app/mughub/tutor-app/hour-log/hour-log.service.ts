import { Injectable } from '@angular/core';
import { User } from '../../auth/user.model';
import { UserService } from '../../auth/user.service';
import * as firebase from 'firebase/app';
import 'firebase/firestore';

@Injectable({ providedIn: 'root' })

export class HourLogService {

  constructor(private userService: UserService) { }

  uploadHoursToFb(connection: User, date: Date, startTime: string, endTime: string) {
    return firebase.firestore().collection('/hours')
      .doc()
      .set({
        userId: this.userService.getUserSession().uid,
        connection: Object.assign({}, connection),
        date: date,
        startTime: startTime,
        endTime: endTime
      })
  }

  fetchHoursFromFb() {
    return firebase.firestore().collection('/hours')
      .where('userId', '==', this.userService.getUserSession().uid)
  }

  convertTime(militaryTime: string) {

    const militaryTimeArray = militaryTime.split(':');
    const hours = Number(militaryTimeArray[0]);
    const minutes = Number(militaryTimeArray[1]);
    const seconds = Number(militaryTimeArray[2]);

    let convertedTime = '';

    convertedTime = this.convertHours(hours);

    convertedTime += (minutes < 10) ? ":0" + minutes : ":" + minutes;
    convertedTime += (seconds < 10) ? ":0" + seconds : ":" + seconds;
    convertedTime += (hours >= 12) ? " P.M." : " A.M.";

    console.log(convertedTime);
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
