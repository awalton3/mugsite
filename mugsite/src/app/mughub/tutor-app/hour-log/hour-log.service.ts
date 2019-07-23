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

}
