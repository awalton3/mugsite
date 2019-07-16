import { Injectable } from '@angular/core';
import * as firebase from 'firebase/app';
import 'firebase/firestore';


@Injectable({ providedIn: 'root' })
export class MughubService {

  constructor() { }

  fetchStudentsFromFb() {
    return firebase.firestore().collection('users')
      .where('type', '==', 'student')
      .orderBy('name')
  }

  fetchTutorsFromFb() {
    return firebase.firestore().collection('users')
      .where('type', '==', 'tutor')
      .orderBy('name')
  }

  createPureJsObj() {
    
  }

}
