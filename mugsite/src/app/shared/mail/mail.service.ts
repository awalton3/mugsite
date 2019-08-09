import { Injectable } from '@angular/core';
import * as firebase from 'firebase/app';
import 'firebase/firestore';
import { AngularFirestore, Query } from '@angular/fire/firestore';
import { UserService } from 'src/app/mughub/auth/user.service';
import { SnackBarService } from '../snack-bar/snack-bar.service';
import { AttachmentService } from '../attachments/attachments.service';
import { Attachment } from '../attachments/attachment.model';
import { UploadService } from './upload/upload.service';

@Injectable({ providedIn: 'root' })

export class MailService {

  constructor(
    private db: AngularFirestore,
    private userService: UserService,
    private attachmentService: AttachmentService,
    private uploadService: UploadService,
    private snackBarService: SnackBarService
  ) { }

  async uploadMessage(recipients: string[], body: string, subject: string, attachments: Attachment[]) {
    return this.db.collection('/uploads')
      .doc(this.db.createId())
      .set({
        sender: this.userService.getUserSession().uid,
        recipients: recipients,
        subject: subject,
        body: body,
        attachments: this.attachmentService.getAttachmentsForFbColl(attachments),
        creationDate: {
          day: new Date().getDate(),
          month: new Date().getMonth() + 1
        },
        timestamp: new Date(),
        unread: true
      })
      .then(() => {
        this.onSuccessUpload(attachments)
          .then(() => {
            this.onSuccess('Message Sent');
            return Promise.resolve('success');
          })
          .catch(error => {
            this.onError('An error occured in uploading your attachments.', error);
            return Promise.reject('success');
          })
      }).catch(error => {
        this.onError('An error occured in sending this message', error);
        return Promise.reject(error);
      })
  }

  onSuccessUpload(attachments: Attachment[]) {
    // this.attachmentService.uploadAttachments(attachments)
    //   .then(() => this.onSuccess('Message Sent'))
    //   .catch(error => this.onError('An error occured in uploading your attachments.', error))
    //TODO need better error handling and info for user.

    return this.attachmentService.uploadAttachments(attachments)
      .then(() => Promise.resolve('success'))
      .catch(error => Promise.reject(error))
  }

  onSuccess(message: string) {
    this.snackBarService.onOpenSnackBar.next({ message: message, isError: false });
  }

  onError(message: string, error: any) {
    this.snackBarService.onOpenSnackBar.next({ message: message, isError: true });
    console.log(error);
  }

  fetchUserUploads(): Query {
    return firebase.firestore().collection('/uploads')
      .where('sender', '==', this.userService.getUserSession().uid)
      .orderBy('timestamp', 'desc')
  }

  fetchInboxUploads(): Query {
    return firebase.firestore().collection('/uploads')
      .where('recipients', 'array-contains', this.userService.getUserSession().uid)
      .orderBy('timestamp', 'desc')
  }

  fetchTrashUploads(): Query {
    return firebase.firestore().collection('/trash' + this.userService.getUserSession().uid + '/uploads')
      .orderBy('timestamp', 'desc')
  }

  editMessage(id: string, updateObj: any, attachmentsToRemove: any): Promise<any> {
    const attachmentsToAdd = [...updateObj.attachments];
    updateObj['attachments'] = this.attachmentService.getAttachmentsForFbColl(updateObj.attachments)

    return this.db.collection('/uploads')
      .doc(id)
      .update(updateObj)
      .then(() => {
        return this.onSuccessEdit(attachmentsToAdd, attachmentsToRemove)
          .then(() => {
            this.onSuccess("Message Updated");
            this.uploadService.uploadClicked.next(null);
            return Promise.resolve('success')
          })
          .catch((error) => {
            this.onError("Message failed to update.", error)
            return Promise.reject(error)
          })
      })
      .catch(error => {
        this.onError("Error Updating Message.", error);
        return Promise.reject(error);
      })
  }

  async onSuccessEdit(attachments: Attachment[], attachmentsToRemove: Attachment[]) {
    const tasks = [
      'upload attachments',
      'remove attachments'
    ]

    return Promise.all(tasks.map(task => {
      if (task === 'upload attachments') {
        this.attachmentService.uploadAttachments(attachments)
          .then(() => { return Promise.resolve('success') })
          .catch(error => { return Promise.reject(error) })
      } else {
        this.attachmentService.removeAttachmentsFromStorage(attachmentsToRemove)
          .then(() => Promise.resolve('success'))
          .catch((error) => Promise.reject(error))
      }
    }))
    //TODO need better error handling and info for user.
  }

  addToTrash(upload /* Upload */) {
    this.db.collection('/trash/' + this.userService.getUserSession().uid + '/uploads')
      .doc(this.db.createId())
      .set(upload)
      .then(() => {
        this.uploadService.uploadClicked.next(null);
        this.onSuccess("Message Added to Trash");
        this.deleteUploadFromUploadsColl(upload.id)
          .then(() => { })
          .catch(error => console.log(error))
      })
      .catch(error => this.onError("Could not add message to trash bin.", error))
  }

  deleteUploadFromUploadsColl(id: string) {
    return this.db.collection('/uploads')
      .doc(id)
      .delete()
  }

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
