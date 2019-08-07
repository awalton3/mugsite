import { Injectable } from '@angular/core';
import * as firebase from 'firebase/app';
import 'firebase/firestore';
import { Query } from '@angular/fire/firestore';


@Injectable({ providedIn: 'root' })
export class MughubService {

  constructor() { }

  fetchStudentsFromFb(): Query {
    return firebase.firestore().collection('users')
      .where('type', '==', 'student')
      .orderBy('name')
  }

  fetchTutorsFromFb(): Query {
    return firebase.firestore().collection('users')
      .where('type', '==', 'tutor')
      .orderBy('name')
  }

}
