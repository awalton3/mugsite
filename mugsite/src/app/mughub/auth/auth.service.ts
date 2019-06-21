import * as firebase from 'firebase';
import { Injectable } from '@angular/core';
import { UserService } from 'src/app/shared/services/user.service';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({ providedIn: 'root' })

export class AuthService {

  constructor(
    private userService: UserService,
    private db: AngularFirestore
  ) {}

  register(formData: { email: string; password: string; name: any; type: string; }) {
    firebase.auth().createUserWithEmailAndPassword(formData.email, formData.password)
      .then(userObj => {

        //add user to Firebase User collection
        this.db.collection('/users')
          .doc(userObj.user.uid)
          .set({
            name: formData.name,
            photoUrl: '',
            email: userObj.user.email,
            type: formData.type,
            uid: userObj.user.uid
          });

        //update local userObj
        this.userService.updateLocalUser(
          userObj.user.displayName,
          userObj.user.photoURL,
          userObj.user.email,
          formData.type,
          userObj.user.uid
        );

      })
      .catch(error => { alert(error.message) })
  }

  login(formData: { email: string; password: string; }) {
    firebase.auth().signInWithEmailAndPassword(formData.email, formData.password)
      .then(userObj => {
        this.db.collection('/users').doc(userObj.user.uid).get()
          .subscribe(userObj => {
            this.userService.updateLocalUser(
              userObj.data().name,
              userObj.data().photoUrl,
              userObj.data().email,
              userObj.data().type,
              userObj.data().uid
            )
          })
      })
      .catch(error => { alert(error.message) })
  }

}
