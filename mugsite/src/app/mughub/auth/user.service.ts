import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Subject } from 'rxjs';
import { first } from 'rxjs/operators';
import { User } from './user.model';

@Injectable({ providedIn: 'root' })

export class UserService {

  private currentUser: User;
  user = new Subject<User>();

  constructor(private db: AngularFirestore) { }

  getCurrentUser() {
    return this.currentUser;
  }

  getUserSession() {
    return JSON.parse(sessionStorage.getItem('user'))
  }

  createUserSession(user: User) {
    sessionStorage.setItem('user', JSON.stringify(user));
  }

  isUserAuthenticated(attemptedRoute: string) {
    let user = this.getUserSession();

    switch (attemptedRoute) {
      case 'student':
        return (user && (user.type === 'student'));
      case 'tutor':
        return (user && (user.type === 'tutor'));
      case 'welcome':
        return (user && (user.isNewUser))
      default: return !!user;
    }
  }

  getUserFromFbCollect(uid: string) {
    return this.db.collection('/users').doc(uid).get();
  }

  addUserToFbCollect(name: string, photoUrl: string, email: string, type: string, uid: string, isNewUser: boolean) {
    this.db.collection('/users')
      .doc(uid)
      .set({
        name: name,
        photoUrl: photoUrl,
        email: email,
        type: type,
        uid: uid,
        isNewUser: isNewUser,
        prefs: {
          AutoLog: true,
          InboxNotif: true,
          LogNotif: true
        }
      });
  }

  createLocalUser(uid: string) {
    this.getUserFromFbCollect(uid)
      .pipe(first())
      .subscribe(userObj => {
        this.currentUser = new User(
          userObj.data().name,
          userObj.data().photoUrl,
          userObj.data().email,
          userObj.data().type,
          userObj.data().uid,
          userObj.data().isNewUser,
          userObj.data().prefs)
        this.user.next(this.currentUser);
        if (!this.isUserAuthenticated(null))
          this.createUserSession(this.currentUser);
      })
  }

  //... { propName: 'prefs',  value: { AutoLog: true }}
  updateLocalUser(properties: { name: string, value: any }[]) {
    properties.map(property => {
      if (property.name === 'prefs') {
        Object.keys(property.value).map(pref => {
          this.currentUser['prefs'][pref] = property.value[pref];
        })
      } else {
        this.currentUser[property.name] = property.value;
      }
    })
  }

  updateFbCollect() {
    this.db.collection('/users')
      .doc(this.currentUser.uid)
      .update(this.currentUser)
  }

  uploadeProfilePhoto(photo) {

  }

}
