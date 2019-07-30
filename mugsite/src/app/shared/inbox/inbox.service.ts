import { Injectable } from '@angular/core';
import * as firebase from 'firebase/app';
import 'firebase/firestore';
import { UserService } from 'src/app/mughub/auth/user.service';

@Injectable({ providedIn: 'root' })

export class InboxService {

  constructor(private userService: UserService) {}

  fetchUploads() {
    return firebase.firestore().collection('/uploads')
      .where('recipient.email', '==', this.userService.getUserSession().email)
      .orderBy('timestamp', 'desc')
  }

}
