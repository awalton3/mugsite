import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { User } from '../models/user.model';
import { Subject, Subscription } from 'rxjs';

@Injectable({ providedIn: 'root' })

export class UserService {

  private currentUser: User;

  user = new Subject<User>();

  constructor(private db: AngularFirestore) { }

  getLocalUser() {
    return this.currentUser;
  }

  getUserFromFbCollect(uid: string) {
    return this.db.collection('/users').doc(uid).get();
  }

  addUserToFbCollect(name: string, photoUrl: string, email: string, type: string, uid: string) {
    this.db.collection('/users')
      .doc(uid)
      .set({
        name: name,
        photoUrl: photoUrl,
        email: email,
        type: type,
        uid: uid
      });
  }

  createLocalUser(uid: string) {
    let userSub: Subscription = this.getUserFromFbCollect(uid)
      .subscribe(userObj => {
        this.currentUser = new User(
          userObj.data().name,
          userObj.data().photoUrl,
          userObj.data().email,
          userObj.data().type,
          userObj.data().uid,
          true)
      })
    userSub.unsubscribe();
  }

  // updateLocalUser(name: string, photoUrl: string, email: string, type: string, uid: string) {
  //   //parameters are null if they should not be updated
  //   if (name) this.currentUser.name = name;
  //   if (photoUrl) this.currentUser.photoUrl = photoUrl;
  //   if (email) this.currentUser.email = email;
  //   if (type) this.currentUser.type = type;
  //   if (uid) this.currentUser.uid = uid;
  //   this.user.next(this.currentUser);
  // }

}
