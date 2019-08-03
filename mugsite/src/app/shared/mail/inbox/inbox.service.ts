import { Injectable } from '@angular/core';
import * as firebase from 'firebase/app';
import 'firebase/firestore';
import { UserService } from 'src/app/mughub/auth/user.service';

@Injectable({ providedIn: 'root' })

export class InboxService {

  constructor(private userService: UserService) {}

  fetchUploads() {
    return firebase.firestore().collection('/uploads')
      .where('recipients', 'array-contains', this.userService.getUserSession())
      .orderBy('timestamp', 'desc')
  }

}
