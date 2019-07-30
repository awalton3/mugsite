import { Injectable } from '@angular/core';
import { UserService } from '../../auth/user.service';
import * as firebase from 'firebase/app';
import 'firebase/firestore';
import { AngularFirestore } from '@angular/fire/firestore';
import { Subject } from 'rxjs';
import { Upload } from './upload.model';

@Injectable({ providedIn: 'root' })

export class UploadService {

  uploadClicked = new Subject<Upload>();

  constructor(
    private db: AngularFirestore,
    private userService: UserService
  ) { }

  addUpload(formData, attachmentNameRefs: string[]) {
    return this.db.collection('/uploads')
      .doc(this.db.createId()) //random id
      .set({
        sender: Object.assign({}, this.userService.getUserSession()),
        recipient: formData.recipient,
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

  editUpload(id: string, updateObj: any) {
    return this.db.collection('/uploads')
      .doc(id)
      .update(updateObj)
  }

  deleteUpload(id) {
    return this.db.collection('/uploads')
      .doc(id)
      .delete()
  }

  fetchUploads() {
    return firebase.firestore().collection('/uploads')
      .where('sender', '==', this.userService.getUserSession())
      .orderBy('timestamp', 'desc')
  }

}
