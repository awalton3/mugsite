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

  addUserToFbCollect(user: User) {
    this.db.collection('/users')
      .doc(user.uid)
      .set(Object.assign({}, user))
      .then(() => console.log('success'))
      .catch(error => console.log(error))
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
          userObj.data().prefs,
          userObj.data().connections)
        this.user.next(this.currentUser);
        if (!this.isUserAuthenticated(null))
          this.createUserSession(this.currentUser);
        return Promise.resolve(this.currentUser);
      })
  }

  updateLocalUser(properties: { name: string, value: any }[]) {
    properties.map(property => {
      if (property.name === 'prefs') {
        Object.keys(property.value).map(pref => {
          this.currentUser['prefs'][pref] = property.value[pref];
        })
      } else if (Object.keys(this.currentUser).includes(property.name)) {
        this.currentUser[property.name] = property.value;
      } else {
        console.log('an error occurred')
      }
    })
    this.createUserSession(this.currentUser);
  }

  updateFbCollect() {
    let user = Object.assign({}, this.currentUser);
    let connections = this.currentUser.connections.map((obj)=> {return Object.assign({}, obj)});
    user.connections = connections;
    this.db.collection('/users')
      .doc(this.currentUser.uid)
      .update(user)
      .then(() => console.log('success'))
      .catch(error => console.log(error))
  }

}
