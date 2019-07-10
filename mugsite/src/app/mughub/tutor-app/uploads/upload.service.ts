import { Injectable } from '@angular/core';
import { UserService } from '../../auth/user.service';
import * as firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({ providedIn: 'root' })

export class UploadService {

  constructor(
    private db: AngularFirestore,
    private userService: UserService
  ) { }

  addUpload(formData, attachmentNameRefs: string[]) {
    return this.db.collection('/uploads')
      .doc(this.db.createId()) //random id
      .set({
        userFrom: this.userService.getCurrentUser().uid,
        userTo: formData.name,
        subject: formData.subject,
        assignment: formData.assignment,
        comments: formData.comments,
        attachments: attachmentNameRefs,
        creationDate: {
          day: new Date().getDate(),
          month: new Date().getMonth() + 1
        },
        timestamp: new Date()
      });
  }

  fetchUploads() {
    return firebase.firestore().collection('/uploads')
      .where('userFrom', '==', this.userService.getUserSession().uid)
      .orderBy('timestamp', 'desc')
  }

}
