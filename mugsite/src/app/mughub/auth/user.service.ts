import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { first } from 'rxjs/operators';
import { User } from './user.model';
import { SnackBarService } from 'src/app/shared/snack-bar/snack-bar.service';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';

@Injectable({ providedIn: 'root' })

export class UserService {

  // private currentUser: User;
  user = new Subject<User>();

  constructor(
    private db: AngularFirestore,
    private snackBarService: SnackBarService,
    private router: Router
  ) { }

  // getCurrentUser() {
  //   return this.currentUser;
  // }

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
      .then(() => {
        this.router.navigate(['/mughub/login']);
      })
      .catch(error => this.onError('An unexpected error occured.', error))
  }

  createLocalUser(uid: string) {
    this.getUserFromFbCollect(uid)
      .pipe(first())
      .subscribe(userObj => {
        let currentUser = new User(
          userObj.data().name,
          userObj.data().photoUrl,
          userObj.data().email,
          userObj.data().type,
          userObj.data().uid,
          userObj.data().isNewUser,
          userObj.data().prefs,
          userObj.data().connections)

        this.user.next(currentUser);

        if (!this.getUserSession())
          this.createUserSession(currentUser);

        this.navigateUser(currentUser);
      })
  }

  navigateUser(currentUser: User) {
    currentUser.isNewUser ? this.router.navigate(['mughub/welcome']) : this.router.navigate(['mughub', currentUser.type]);
  }

  updateLocalUser(properties: { name: string, value: any }[]) {
    let currentUser = this.getUserSession();
    properties.map(property => {
      if (property.name === 'prefs') {
        Object.keys(property.value).map(pref => {
          currentUser['prefs'][pref] = property.value[pref];
        })
      } else if (Object.keys(currentUser).includes(property.name)) {
        currentUser[property.name] = property.value;
      } else {
        console.log('an error occurred')
      }
    })
    this.createUserSession(currentUser);
    this.user.next(currentUser);
  }

  updateFbCollect() {
    let user = Object.assign({}, this.getUserSession());
    user.connections = user.connections.map((obj) => { return Object.assign({}, obj) });
    this.db.collection('/users')
      .doc(user.uid)
      .update(user)
      .then(() => this.onSuccess('Successfully Updated'))
      .catch(error => this.onError('An error occurred', error))
  }

  onSuccess(message: string) {
    this.snackBarService.onOpenSnackBar.next({ message: message, isError: false });
  }

  onError(message: string, error: string) {
      this.snackBarService.onOpenSnackBar.next({ message: message, isError: true });
    console.log(error);
  }

}
