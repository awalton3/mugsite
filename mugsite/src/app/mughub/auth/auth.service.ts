import * as firebase from 'firebase/app';
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
        this.userService.addUserToFbCollect(formData.name, null, userObj.user.email, formData.type, userObj.user.uid, true);
        this.router.navigate(['/mughub/login']);
        this.verifyEmail();
      })
      .catch(error => this.handleError(error.code))
  }

  login(formData: { email: string; password: string; }) {
    firebase.auth().signInWithEmailAndPassword(formData.email, formData.password)
      .then(userObj => {
        if (userObj.user.emailVerified) {
          this.userService.createLocalUser(userObj.user.uid);
          this.router.navigate(['mughub']);
        } else
          alert("Please verify your email before logging in.");
      })
      .catch(error => this.handleError(error.code))
  }

  verifyEmail() {
    firebase.auth().currentUser.sendEmailVerification()
      .then(() => alert("An email verification has been sent. Please verify your email before logging in."))
      .catch(() => alert("An error occured when sending the email verification. Please be sure the email is valid."));
  }

  resetPassword(email: string) {
    firebase.auth().sendPasswordResetEmail(email)
      .then(() => alert("A password reset email was sent to " + email))
      .catch(error => this.handleError(error.code));
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

  handleError(errorCode) {

    switch (errorCode) {

      //login
      case 'auth/invalid-email':
        alert('The email you entered is not valid.')
        break;
      case 'auth/user-disabled':
        alert('This account has been disabled. Please contact an admin for more information.')
        break;
      case 'auth/user-not-found':
        alert('The email you entered does not exist in our records.')
        break;
      case 'auth/wrong-password':
        alert('The password you entered is invalid.')
        break;

      //register
      case 'auth/email-already-in-use':
        alert('This email is already in use by another user.')
        break;
      case 'auth/invalid-email':
        alert('This email address is not a valid. Please enter a valid email.')
        break;
      case 'auth/operation-not-allowed':
        alert('This operation is not allowed. Please contact awalton3@nd.edu to resolve this issue.');
        break;
      case 'auth/weak-password':
        alert('The entered password is weak. Please enter a stronger password.');
        break;

      //reset
      case 'auth/invalid-email':
        alert('The email you entered is invalid. Please enter a valid email address');
        break;
      case 'auth/user-not-found':
        alert('No user was found with that email.');
        break;

    }
  }
}
