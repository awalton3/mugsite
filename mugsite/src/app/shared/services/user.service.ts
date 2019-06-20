import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { User } from '../models/user.model';
import * as firebase from 'firebase';
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

  constructor(private db: AngularFirestore) { }

  getCurrentUser() {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        console.log(user)
        return user;
      }
    });
    return;
  }

  getUserTypeFromFirebase(uid: string) {
    return this.db.collection('/users').doc(uid).get();
  }

  //updating firebase methods
  addUserTypeToFirebase(uid: string, type: string) {
    this.db.collection('/users')
      .doc(uid)
      .set({
        type: type
      });
  }

  updateUserFirebaseProfile(name: string, photoUrl: string) {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        user.updateProfile({
          'displayName': name,
          'photoURL': photoUrl
        })
      }
    });
  }

  //updating local user object methods
  updateLocalUser(name: string, photoUrl: string, email: string, type: string, uid: string) {
    //parameters are null if they should not be updated
    if (name) this.user.name = name;
    if (photoUrl) this.user.photoUrl = photoUrl;
    if (email) this.user.email = email;
    if (type) this.user.type = type;
    if (uid) this.user.uid = uid;
    this.userSub.next(this.user);
  }

}
