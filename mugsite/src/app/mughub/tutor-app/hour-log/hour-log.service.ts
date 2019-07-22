import { Injectable } from '@angular/core';
import { User } from '../../auth/user.model';
import { AngularFirestore } from '@angular/fire/firestore';
import { UserService } from '../../auth/user.service';

@Injectable({ providedIn: 'root' })

export class HourLogService {

  constructor(
    private db: AngularFirestore,
    private userService: UserService
  ) { }

  uploadHoursToFb(connection: User, date: Date, startTime: string, endTime: string) {
    return this.db.collection('/hours')
      .doc(this.userService.getUserSession().uid)
      .set({
        connection: Object.assign({}, connection),
        date: date,
        startTime: startTime,
        endTime: endTime
      })
  }

}
