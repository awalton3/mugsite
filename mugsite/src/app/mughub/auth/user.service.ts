import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { first } from 'rxjs/operators';
import { User } from './user.model';
import { SnackBarService } from 'src/app/shared/snack-bar/snack-bar.service';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { AngularFireStorage, AngularFireUploadTask } from '@angular/fire/storage';
import { UploadTaskSnapshot } from '@angular/fire/storage/interfaces';

@Injectable({ providedIn: 'root' })

export class UserService {

  user = new Subject<User>();

  constructor(
    private db: AngularFirestore,
    private storage: AngularFireStorage,
    private snackBarService: SnackBarService,
    private router: Router
  ) { }

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
      })
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
    let user = this.getUserSession();
    this.db.collection('/users')
      .doc(user.uid)
      .update(user)
      .then(() => this.onSuccess('Profile Successfully Updated'))
      .catch(error => this.onError('An error occurred', error))
  }

  async uploadProfileImage(imageDataUrl: string): Promise<any> {
    try {
      const snapshot = await this.uploadProfileImageToFb(imageDataUrl);
      try {
        const url = await this.getFbDownloadUrl(snapshot);
        return await Promise.resolve(url);
      }
      catch (error) {
        return await Promise.reject(error);
      }
    }
    catch (error_1) {
      Promise.reject(error_1);
    }
  }

  uploadProfileImageToFb(imageDataUrl: string): AngularFireUploadTask {
    return this.storage.ref('profileImage_' + this.getUserSession().uid).putString(imageDataUrl, 'data_url');
  }

  async getFbDownloadUrl(snapshot: UploadTaskSnapshot) {
    try {
      const url = await snapshot.ref.getDownloadURL();
      return Promise.resolve(url);
    }
    catch (error) {
      return Promise.resolve(error);
    }
  }

  onSuccess(message: string) {
    this.snackBarService.onOpenSnackBar.next({ message: message, isError: false });
  }

  onError(message: string, error: string) {
    this.snackBarService.onOpenSnackBar.next({ message: message, isError: true });
    console.log(error);
  }

}
