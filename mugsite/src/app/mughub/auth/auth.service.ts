import * as firebase from 'firebase/app';
import { Injectable } from '@angular/core';
import { UserService } from './user.service';
import { User } from './user.model';
import { SnackBarService } from 'src/app/shared/snack-bar/snack-bar.service';
import { first } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({ providedIn: 'root' })

export class AuthService {

  constructor(
    private userService: UserService,
    private snackBarService: SnackBarService,
    private router: Router
  ) { }

  register(formData: { email: string; password: string; name: any; type: string; }) {
    firebase.auth().createUserWithEmailAndPassword(formData.email, formData.password)
      .then(userObj => {
        this.userService.addUserToFbCollect(this.createNewUserObj(userObj, formData))
        this.verifyEmail();
      })
      .catch(error => this.handleError(error.code))
  }

  createNewUserObj(userObj, formData) {
    let user = new User(
      formData.name,
      'https://i.ibb.co/pjG5Rkf/4k-wallpaper-astronomy-evening-2085998.jpg',
      userObj.user.email,
      formData.type,
      userObj.user.uid,
      true,
      { AutoLog: true, InboxNotif: true, LogNotif: true },
      []);
    return user
  }

  login(formData: { email: string; password: string; }, redirectUrl: string) {
    firebase.auth().signInWithEmailAndPassword(formData.email, formData.password)
      .then(userObj => {
        // if (userObj.user.emailVerified) {
        //   this.userService.createLocalUser(userObj.user.uid)
        //   this.userService.user
        //     .pipe(first())
        //     .subscribe(user => this.router.navigate(['mughub', user.type]));
        // } else
        //   alert("Please verify your email before logging in.");
        this.userService.createLocalUser(userObj.user.uid);
        this.userService.user
          .pipe(first())
          .subscribe(user => {
            if (!redirectUrl || (redirectUrl && user.type !== redirectUrl.split('/')[2]))
              user.isNewUser ? this.router.navigate(['mughub/welcome']) : this.router.navigate(['mughub', user.type]);
            else
              this.router.navigateByUrl(redirectUrl);
          });
      })
      .catch(error => this.handleError(error.code))
  }

  verifyEmail() {
    firebase.auth().currentUser.sendEmailVerification()
      .then(() => this.onSuccess("An email verification has been sent."))
      .catch(() => this.onError("An error occured when sending the email verification. Please be sure the email is valid."));
  }

  resetPassword(email: string) {
    firebase.auth().sendPasswordResetEmail(email)
      .then(() => this.onSuccess("A password reset email was sent to " + email))
      .catch(error => this.handleError(error.code));
  }

  logout() {
    firebase.auth().signOut();
    sessionStorage.clear();
  }

  onSuccess(message: string) {
    this.snackBarService.onOpenSnackBar.next({ message: message, isError: false });
  }

  onError(message: string) {
    this.snackBarService.onOpenSnackBar.next({ message: message, isError: true });
  }

  handleError(errorCode: any) {

    switch (errorCode) {

      //login
      case 'auth/invalid-email':
        this.onError('Your email is invalid.')
        break;
      case 'auth/user-disabled':
        this.onError('Your account is disabled.')
        break;
      case 'auth/user-not-found':
        this.onError('Your email is not registered.')
        break;
      case 'auth/wrong-password':
        this.onError('Your password is invalid.')
        break;

      //register
      case 'auth/email-already-in-use':
        this.onError('Email already in use')
        break;
      case 'auth/invalid-email':
        this.onError('Email address is invalid')
        break;
      case 'auth/operation-not-allowed':
        this.onError('Operation not allowed');
        break;
      case 'auth/weak-password':
        this.onError('Password is weak');
        break;

      //reset
      case 'auth/invalid-email':
        this.onError('Email invalid');
        break;
      case 'auth/user-not-found':
        this.onError('No user found');
        break;

    }
  }
}
