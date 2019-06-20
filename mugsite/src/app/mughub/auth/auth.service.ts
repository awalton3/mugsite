import * as firebase from 'firebase';
import { Injectable } from '@angular/core';
import { UserService } from 'src/app/shared/services/user.service';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({ providedIn: 'root' })

export class AuthService {

  constructor(
    private userService: UserService,
    private db: AngularFirestore
  ) { }

  register(formData: { email: string; password: string; name: any; type: string; }) {
    firebase.auth().createUserWithEmailAndPassword(formData.email, formData.password)
      .then(userObj => {

        //add user to Firebase User collection
        let user = userObj.user;
        this.db.collection('/users')
          .doc(user.uid)
          .set({
            name: formData.name,
            photoUrl: '',
            email: user.email,
            type: formData.type,
            uid: user.uid
          });

        //update users collection
        this.userService.updateLocalUser(
          user.displayName,
          user.photoURL,
          user.email,
          formData.type,
          user.uid
        );

      })
      .catch(error => {
        alert(error.message)
      })
  }

  // addToUserCollection(uid: string, user) {
  //   this.db.collection('/users')
  //     .doc(uid)
  //     .set({
  //       name: user.displayname,
  //       photoUrl: user.photoUrl,
  //     });
  // }

  login(formData: { email: string; password: string; }) {
    firebase.auth().signInWithEmailAndPassword(formData.email, formData.password)
      .then(user => {
        let newUser = user.user;
        let type = '';
        this.userService.getUserTypeFromFirebase(newUser.uid)
          .subscribe(userData => {
            type = userData.data().type;
          })

        this.userService.updateLocalUser(
          newUser.displayName,
          newUser.photoURL,
          newUser.email,
          type,
          newUser.uid)
      })
      .catch(error => {
        alert(error.message)
      })
  }

}
