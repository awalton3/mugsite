import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { User } from '../models/user.model';

@Injectable({providedIn: 'root'})

export class UserService {

  constructor(private db: AngularFirestore) {}

  getUser(uid: string) {

  }

  getUsers() {

  }

  addUser(user: User) {
    // this.db.collection('users').add({
    //   name: user.name,
    //   email: user.email,
    //   type: user.type
    // })
  }

  updateUser(uid: string) {

  }

  deleteUser(uid: string) {

  }


}
