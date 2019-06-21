import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { User } from '../models/user.model';
import { Subject } from 'rxjs';

@Injectable({ providedIn: 'root' })

export class UserService {

  private user: User = {
    name: '',
    photoUrl: '',
    email: '',
    type: '',
    uid: ''
  }

  userSub = new Subject<User>();

  constructor() { }

  updateLocalUser(name: string, photoUrl: string, email: string, type: string, uid: string) {
    //parameters are null if they should not be updated
    if (name) this.user.name = name;
    if (photoUrl) this.user.photoUrl = photoUrl;
    if (email) this.user.email = email;
    if (type) this.user.type = type;
    if (uid) this.user.uid = uid;
    this.userSub.next(this.user);
  }

  getLocalUser() {
    return this.user;
  }

}
