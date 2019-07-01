import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Subject, Subscription } from 'rxjs';
import { User } from './user.model';
import { AuthService } from './auth.service';

@Injectable({ providedIn: 'root' })

export class UserService {

  private currentUser: User;
  userFbCollectSub: Subscription;

  user = new Subject<User>();

  constructor(private db: AngularFirestore) { }

  getCurrentUser() {
    return this.currentUser; 
  }

  isUserAuthenticated(attemptedRoute: string) {
    console.log("Checking user authentication to access " + attemptedRoute);
    let user = JSON.parse(sessionStorage.getItem('user'));
    return (user && (user.type === attemptedRoute));
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

  createLocalUser(uid: string, isNewUser: boolean) {
    this.userFbCollectSub = this.getUserFromFbCollect(uid)
      .subscribe(userObj => {
        let creationTime = new Date().getTime();
        this.currentUser = new User(
          userObj.data().name,
          userObj.data().photoUrl,
          userObj.data().email,
          userObj.data().type,
          userObj.data().uid,
          isNewUser,
          creationTime)
        this.user.next(this.currentUser);
        if (!sessionStorage.getItem('user'))
          sessionStorage.setItem('user', JSON.stringify(this.currentUser));
      })
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
