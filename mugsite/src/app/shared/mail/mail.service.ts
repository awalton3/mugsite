import { Injectable } from '@angular/core';
import * as firebase from 'firebase/app';
import 'firebase/firestore';
import { AngularFirestore } from '@angular/fire/firestore';
import { UserService } from 'src/app/mughub/auth/user.service';
import { SnackBarService } from '../snack-bar/snack-bar.service';
import { AttachmentService } from '../attachments/attachments.service';

@Injectable({ providedIn: 'root' })

export class MailService {

  // uploadClicked = new Subject<Upload>();
  //

  constructor(
    private db: AngularFirestore,
    private userService: UserService,
    private attachmentService: AttachmentService,
    private snackBarService: SnackBarService
  ) { }

  async uploadMessage(recipients: string[], subject: string, body: string, attachments: File[]) {
    let attachmentNameRefs = this.attachmentService.getAttachmentNameRefs(attachments);
    try {
      await this.db.collection('/uploads')
        .doc(this.db.createId())
        .set({
          sender: this.userService.getUserSession().uid,
          recipients: recipients,
          subject: subject,
          body: body,
          attachments: attachmentNameRefs,
          creationDate: {
            day: new Date().getDate(),
            month: new Date().getMonth() + 1
          },
          timestamp: new Date()
        });
      return this.onSuccessUpload(attachments, attachmentNameRefs);
    } catch (error) {
      return this.onError('An error occured in sending this message', error);
    }
  }

  onSuccessUpload(attachments: File[], attachmentNameRefs: string[]) {
    this.attachmentService.uploadAttachments(attachments, attachmentNameRefs)
      .then(() => this.onSuccess('Message Sent'))
      .catch(error => this.onError('An error occured in uploading your attachments.', error))
    //TODO need better error handling and info for user.
  }

  onSuccess(message: string) {
    this.snackBarService.onOpenSnackBar.next({ message: message, isError: false });
  }

  onError(message: string, error: any) {
    this.snackBarService.onOpenSnackBar.next({ message: message, isError: true });
    console.log(error);
  }

  fetchUserUploads() {
    return firebase.firestore().collection('/uploads')
      .where('sender', '==', this.userService.getUserSession().uid)
      .orderBy('timestamp', 'desc')
  }

  fetchInboxUploads() {
    return firebase.firestore().collection('/uploads')
      .where('recipients', 'array-contains', this.userService.getUserSession().uid)
      .orderBy('timestamp', 'desc')
  }

  //
  // editUpload(id: string, updateObj: any) {
  //   return this.db.collection('/uploads')
  //     .doc(id)
  //     .update(updateObj)
  // }
  //
  // deleteUpload(id) {
  //   return this.db.collection('/uploads')
  //     .doc(id)
  //     .delete()
  // }
  //
  // fetchUploads() {
  //   return firebase.firestore().collection('/uploads')
  //     .where('sender', '==', this.userService.getUserSession())
  //     .orderBy('timestamp', 'desc')
  // }

}
