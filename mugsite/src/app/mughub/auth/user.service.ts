import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Subject, Subscription } from 'rxjs';
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

  isUserAuthenticated(attemptedRoute: string) {
    let user = JSON.parse(sessionStorage.getItem('user'));

    if (attemptedRoute === 'student' || attemptedRoute === 'tutor')
      return (user && (user.type === attemptedRoute));
    else if (attemptedRoute === 'welcome')
      return (user && (user.isNewUser))
    else
      return !!user
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
        isNewUser: isNewUser
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
          userObj.data().isNewUser)
        this.user.next(this.currentUser);
        if (!sessionStorage.getItem('user'))
          sessionStorage.setItem('user', JSON.stringify(this.currentUser));
      })
  }

  uploadeProfilePhoto(photo) {
    
  }

  // getUserIdToken() {
  //   firebase.auth().onAuthStateChanged(user => {
  //     if (user) {
  //       user.getIdTokenResult().then(idToken => {
  //         console.log(idToken);
  //       });
  //     }
  //   });
  // }

  // updateLocalUser(name: string, photoUrl: string, email: string, type: string, uid: string) {
  //   //parameters are null if they should not be updated
  //   if (name) this.currentUser.name = name;
  //   if (photoUrl) this.currentUser.photoUrl = photoUrl;
  //   if (email) this.currentUser.email = email;
  //   if (type) this.currentUser.type = type;
  //   if (uid) this.currentUser.uid = uid;
  //   this.user.next(this.currentUser);
  // }

  // checkUserSession() {
  //   const currTime = new Date().getTime();
  //   const currUser = JSON.parse(sessionStorage.getItem('user'));
  //   if (currUser && (currTime - currUser.creationTime >= 10000)) {
  //     alert("Your session has timed out. Rerouting to login page.")
  //     this.router.navigate(['/mughub/auth/login']);
  //   }
  // }

}
