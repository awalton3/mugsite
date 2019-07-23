import { Injectable } from '@angular/core';
import { User } from '../../auth/user.model';
import { UserService } from '../../auth/user.service';
import * as firebase from 'firebase/app';
import 'firebase/firestore';
import { Subject } from 'rxjs';
import { HourLogElement } from './hour-log-element.model';

@Injectable({ providedIn: 'root' })

export class HourLogService {

  loggedHours: { [key: number]: HourLogElement[] } = {};
  loggedHoursChanged = new Subject<{ [key: number]: HourLogElement[] }>();

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

  updateHoursInFb(connection: User, date: Date, startTime: string, endTime: string, hourLogElId: string) {
    return firebase.firestore().collection('/hours')
      .doc(hourLogElId)
      .update({
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

  deleteHoursInFb(hourLogElId: string) {
    return firebase.firestore().collection('/hours')
      .doc(hourLogElId)
      .delete()
  }

  onLoggedHoursChanged() {
    this.loggedHoursChanged.next(this.loggedHours);
  }

  addToLoggedHours(hourLogElData: any, hourLogElId: string) {
    const hourLogElement = this.getLogEl(hourLogElData, hourLogElId);
    const dateInMiliSecs = hourLogElement.date.getTime();
    if (this.loggedHours[dateInMiliSecs]) {
      this.loggedHours[dateInMiliSecs].push(hourLogElement);
    } else {
      this.loggedHours[dateInMiliSecs] = [];
      this.loggedHours[dateInMiliSecs].push(hourLogElement);
    }
  }

  getLogEl(hourLogEldata, hourLogElid: string) {
    let date = hourLogEldata.date.toDate(); //convert firebase timestamp to Date obj
    date.setHours(0, 0, 0, 0);
    return {
      id: hourLogElid,
      connection: hourLogEldata.connection,
      date: date,
      startTime: hourLogEldata.startTime,
      endTime: hourLogEldata.endTime,
    }
  }

  isDateWithinTimeframe(dateToCheck: Date) {
    const pastDate = new Date();
    pastDate.setDate(pastDate.getDate() - 14);
    pastDate.setHours(0, 0, 0, 0);
    return dateToCheck >= pastDate;
  }

}
