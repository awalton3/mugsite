import * as firebase from 'firebase';
import { Injectable } from '@angular/core';
import { UserService } from 'src/app/shared/services/user.service';

@Injectable({ providedIn: 'root' })

export class AuthService {

  constructor(private userService: UserService) {}

  register(formData: { email: string; password: string; name: any; type: string; }) {
    firebase.auth().createUserWithEmailAndPassword(formData.email, formData.password)
      .then(userObj => {
        this.userService.addUserToFbCollect(formData.name, null, userObj.user.email, formData.type, userObj.user.uid);
      })
      .catch(error => { alert(error.message) })
  }

  login(formData: { email: string; password: string; }) {
    firebase.auth().signInWithEmailAndPassword(formData.email, formData.password)
      .then(userObj => {
        this.userService.createLocalUser(userObj.user.uid)
      })
      .catch(error => { alert(error.message) })
  }

}
