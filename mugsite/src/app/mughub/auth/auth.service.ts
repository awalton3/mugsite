import * as firebase from 'firebase';
import { Injectable } from '@angular/core';
import { UserService } from './user.service';
import { Router } from '@angular/router';

@Injectable({ providedIn: 'root' })

export class AuthService {

  constructor(
    private userService: UserService,
    private router: Router
  ) { }

  register(formData: { email: string; password: string; name: any; type: string; }) {
    firebase.auth().createUserWithEmailAndPassword(formData.email, formData.password)
      .then(userObj => {
        let tempUser = {
          name: formData.name,
          photoUrl: null,
          email: userObj.user.email,
          type: formData.type,
          uid: userObj.user.uid,
          creationTime: null
        };
        sessionStorage.setItem('newUser', JSON.stringify(tempUser));
        this.router.navigate(['/mughub/login']);
        this.verifyEmail();
      })
      .catch(error => { alert(error.message) })
  }

  login(formData: { email: string; password: string; }) {
    firebase.auth().signInWithEmailAndPassword(formData.email, formData.password)
      .then(userObj => {
        if (userObj.user.emailVerified) {
          this.handleAuth(userObj.user.uid)
          this.router.navigate(['mughub']);
        } else
          alert("Please verify your email before logging in.");
      })
      .catch(error => { alert(error.message) })
  }

  handleAuth(uid: string) {
    if (!!sessionStorage.getItem('newUser')) {
      let newUser = JSON.parse(sessionStorage.getItem('newUser'));
      this.userService.addUserToFbCollect(newUser.name, newUser.photoUrl, newUser.email, newUser.type, newUser.uid);
    }
    this.userService.createLocalUser(uid);
  }

  verifyEmail() {
    firebase.auth().currentUser.sendEmailVerification()
      .then(() => { alert("An email verification has been sent. Please verify your email before logging in.") })
      .catch(() => { alert("An error occured when sending an email verification. Please try again.") });
  }

  resetPassword(email: string) {
    firebase.auth().sendPasswordResetEmail(email).then(() => {
      alert("A password reset email was sent.");
    }).catch(error => {
      alert(error.message);
    });
  }

  autoLogin() {
    let user = JSON.parse(sessionStorage.getItem('user'));
    if (!user) return;
    this.userService.createLocalUser(user.uid);
  }

  logout() {
    firebase.auth().signOut();
    sessionStorage.clear();
  }
}
