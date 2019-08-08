import { Injectable } from '@angular/core';
import { UserService } from '../../auth/user.service';
import * as firebase from 'firebase/app';
import 'firebase/firestore';
import { Subject } from 'rxjs';
import { HourLogElement } from './hour-log-element.model';

@Injectable({ providedIn: 'root' })

export class HourLogService {

  loggedHours: { [key: number]: HourLogElement[] } = {};
  loggedHoursChanged = new Subject<{ [key: number]: HourLogElement[] }>();
  newHourLogEl: HourLogElement;

  constructor(private userService: UserService) { }

  uploadHoursToFb(connections: string[], date: Date, startTime: string, endTime: string) {
    return firebase.firestore().collection('/hours')
      .doc()
      .set({
        userId: this.userService.getUserSession().uid,
        connections: connections,
        date: date,
        startTime: startTime,
        endTime: endTime
      })
  }

  updateHoursInFb(connections: string[], date: Date, startTime: string, endTime: string, hourLogElId: string) {
    return firebase.firestore().collection('/hours')
      .doc(hourLogElId)
      .update({
        connections: connections,
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
    this.getLogEl(hourLogElData, hourLogElId)
      .then(logEl => {
        const dateInMiliSecs = logEl.date.getTime();
        if (this.loggedHours[dateInMiliSecs]) {
          this.loggedHours[dateInMiliSecs].push(logEl);
        } else {
          this.loggedHours[dateInMiliSecs] = [];
          this.loggedHours[dateInMiliSecs].push(logEl);
        }
        this.onLoggedHoursChanged()
      })
      .catch(error => console.log(error))
  }

  async getLogEl(hourLogEldata, hourLogElid: string): Promise<any> {
    let date = hourLogEldata.date.toDate(); //convert firebase timestamp to Date obj
    date.setHours(0, 0, 0, 0);
    try {
      const connectionsAsUsers = await this.userService.getConnectionsAsUsers(hourLogEldata.connections);
      const newHourLogEl = new HourLogElement(hourLogElid, connectionsAsUsers, date, hourLogEldata.startTime, hourLogEldata.endTime);
      return Promise.resolve(newHourLogEl);
    }
    catch (error) {
      return Promise.reject(error);
    }
  }

  isDateWithinTimeframe(dateToCheck: Date) {
    const minDate = this.getMinDate();
    return dateToCheck >= minDate;
  }

  isHourLogConflict(startTime: string, endTime: string, date: Date, id: string) {
    const loggedHoursOnDate = this.loggedHours[date.getTime()];
    if (loggedHoursOnDate) {
      return loggedHoursOnDate
        .some(hourLogEl => hourLogEl.startTime === startTime && hourLogEl.endTime === endTime && hourLogEl.id !== id);
    } else return false
  }

  getMinDate() {
    const minDate = new Date();
    minDate.setDate(minDate.getDate() - 14);
    minDate.setHours(0, 0, 0, 0);
    return minDate;
  }

}
