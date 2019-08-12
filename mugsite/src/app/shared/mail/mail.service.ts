import { Injectable } from '@angular/core';
import * as firebase from 'firebase/app';
import 'firebase/firestore';
import { AngularFirestore, Query } from '@angular/fire/firestore';
import { UserService } from 'src/app/mughub/auth/user.service';
import { SnackBarService } from '../snack-bar/snack-bar.service';
import { AttachmentService } from '../attachments/attachments.service';
import { Attachment } from '../attachments/attachment.model';
import { UploadService } from './upload/upload.service';
import { Upload } from './upload/upload.model';
import { take } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })

export class MailService {

  userUploadCollection: string = '/uploads/' + this.userService.getUserSession().uid + '/uploads';
  userTrashCollection: string = '/trash/' + this.userService.getUserSession().uid + '/uploads';
  validUsers: string[];

  constructor(
    private db: AngularFirestore,
    private userService: UserService,
    private attachmentService: AttachmentService,
    private uploadService: UploadService,
    private snackBarService: SnackBarService
  ) { }

  fetchUserUploads(): Query {
    return firebase.firestore().collection(this.userUploadCollection)
      .where('sender', '==', this.userService.getUserSession().uid)
      .orderBy('timestamp', 'desc')
  }

  fetchInboxUploads(): Query {
    return firebase.firestore().collection(this.userUploadCollection)
      .where('recipients', 'array-contains', this.userService.getUserSession().uid)
      .orderBy('timestamp', 'desc')
  }

  fetchTrashUploads(): Query {
    return firebase.firestore().collection('/trash/' + this.userService.getUserSession().uid + '/uploads')
      .orderBy('timestamp', 'desc')
  }

  // async uploadMessage(recipients: string[], body: string, subject: string, attachments: Attachment[]) {
  //   try {
  //     await this.db.collection(this.userUploadCollection)
  //       .doc(this.db.createId())
  //       .set({
  //         sender: this.userService.getUserSession().uid,
  //         recipients: recipients,
  //         subject: subject,
  //         body: body,
  //         attachments: this.attachmentService.getAttachmentsForFbColl(attachments),
  //         creationDate: {
  //           day: new Date().getDate(),
  //           month: new Date().getMonth() + 1
  //         },
  //         timestamp: new Date(),
  //         unread: true
  //       });
  //     try {
  //       await this.onSuccessUpload(attachments);
  //       return Promise.resolve('success');
  //     }
  //     catch (error) {
  //       return Promise.reject(error);
  //     }
  //   }
  //   catch (error_1) {
  //     return Promise.reject(error_1);
  //   }
  // }

  uploadMessage(recipients: string[], body: string, subject: string, attachments: Attachment[]): Promise<any> {
    const sender = [this.userService.getUserSession().uid];
    const totalUsers = recipients.concat(sender);
    const uploadId = this.db.createId();
    const upload = this.uploadService.createUploadForFbColl(sender[0], recipients, body, subject, attachments);

    return this.uploadMessageToFbColl(totalUsers, uploadId, upload)
      .then(() => {
        return this.onSuccessUpload(attachments)
          .then(() => Promise.resolve('success'))
          .catch(error => Promise.reject(error))
      })
      .catch(error => Promise.reject(error))
  }

  uploadMessageToFbColl(totalUsers: string[], uploadId: string, upload: any): Promise<any> {
    return Promise.all(totalUsers.map(userId => {
      return this.db.collection('/uploads/' + userId + '/uploads')
        .doc(uploadId)
        .set(upload)
        .then(() => { return Promise.resolve('success') })
        .catch(error => { return Promise.reject(error) })
    }))
  }

  async onSuccessUpload(attachments: Attachment[]): Promise<any> {
    //TODO need better error handling and info for user.
    try {
      await this.attachmentService.uploadAttachments(attachments);
      return await Promise.resolve('success');
    }
    catch (error) {
      return await Promise.reject(error);
    }
  }

  // async editMessage(id: string, updateObj: any, attachmentsToRemove: any): Promise<any> {
  //   let attachmentsToAdd = [];
  //
  //   if (updateObj.attachments) {
  //     attachmentsToAdd = [...updateObj.attachments];
  //     updateObj['attachments'] = this.attachmentService.getAttachmentsForFbColl(updateObj.attachments)
  //   }
  //
  //   try {
  //     await this.db.collection(this.userUploadCollection)
  //       .doc(id)
  //       .update(updateObj);
  //     try {
  //       await this.onSuccessEdit(attachmentsToAdd, attachmentsToRemove);
  //       return Promise.resolve('success');
  //     }
  //     catch (error) {
  //       return Promise.reject(error);
  //     }
  //   }
  //   catch (error_1) {
  //     return Promise.reject(error_1);
  //   }
  // }

  editMessage(upload: Upload, updateObj: any, attachmentsToRemove: any): Promise<any> {
    const senderId = this.userService.getUsersAsIds([upload.sender]);
    const recipientIds = this.userService.getUsersAsIds(upload.recipients);
    const totalUsers = senderId.concat(recipientIds);

    let attachmentsToAdd = [];
    if (updateObj.attachments) {
      attachmentsToAdd = [...updateObj.attachments];
      updateObj['attachments'] = this.attachmentService.getAttachmentsForFbColl(updateObj.attachments);
    }

    // return this.checkIfUsersHaveUpload(totalUsers, upload.id)
    //   .then(() => {

    return this.editMessageInFbColl(totalUsers, upload.id, updateObj)
      .then(() => {
        return this.onSuccessEdit(attachmentsToAdd, attachmentsToRemove)
          .then(() => Promise.resolve('success'))
          .catch(error => Promise.reject(error))
      })
      .catch(error => Promise.reject(error))

    // })
    // .catch(error => Promise.reject(error))
  }

  editMessageInFbColl(totalUsers: string[], uploadId: string, updateObj: any) {
    return Promise.all(totalUsers.map(userId => {
      return this.db.collection('/uploads/' + userId + '/uploads')
        .doc(uploadId)
        .update(updateObj)
        .then(() => { return Promise.resolve('success') })
        .catch(error => {
          Promise.reject(error)
        })
    }))
  }

  checkIfUsersHaveUpload(totalUsers: string[], uploadId: string): Promise<any> {
    this.validUsers = [];
    return Promise.all(totalUsers.map((userId, index) => {
      return this.db.collection('/uploads/' + userId + '/uploads')
        .doc(uploadId)
        .get()
        .pipe(take(1))
        .subscribe(doc => {
          if (doc.exists)
            this.validUsers.push(userId);
          Promise.resolve('success')
        }, error => Promise.reject(error))
    }))
  }

  async onSuccessEdit(attachments: Attachment[], attachmentsToRemove: Attachment[]): Promise<any> {
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

  isUserAllowedToEdit(senderId: string): boolean {
    return senderId === this.userService.getUserSession().uid;
  }

  addToTrash(upload /* of type Upload */) {
    upload.sender = this.userService.getUsersAsIds([upload.sender])[0];
    upload.recipients = this.userService.getUsersAsIds(upload.recipients);

    this.db.collection(this.userTrashCollection)
      .doc(upload.id)
      .set(upload)
      .then(() => {
        this.uploadService.uploadClicked.next(null);
        this.onSuccess("Message Added to Trash");
        this.deleteUploadFromColl(upload.id, this.userUploadCollection)
          .then(() => { })
          .catch(error => console.log(error))
      })
      .catch(error => this.onError("Could not add message to trash bin.", error))
  }

  deleteUploadFromColl(id: string, collection: string) {
    return this.db.collection(collection)
      .doc(id)
      .delete()
  }

  deleteUploadFromFb(upload: Upload): Promise<any> {
    const tasks = ['delete from trash', 'delete attachments'];
    return Promise.all(tasks.map((task: string) => {
      if (task === 'delete from trash') {
        return this.deleteUploadFromColl(upload.id, this.userTrashCollection)
          .then(() => Promise.resolve('success'))
          .catch(error => Promise.reject(error))
      } else {
        return this.attachmentService.removeAttachmentsFromStorage(upload.attachments)
          .then(() => Promise.resolve('success'))
          .catch(error => Promise.reject(error))
      }
    }))
  }

  restoreMessage(userId: string, upload: any, uploadId: string): Promise<any> {
    const tasks = ['upload to inbox', 'delete from trash'];
    return Promise.all(tasks.map(task => {
      if (task === 'upload to inbox') {
        return this.uploadMessageToFbColl([userId], uploadId, upload)
          .then(() => Promise.resolve('success'))
          .catch(error => Promise.reject(error))
      } else {
        const collection = '/trash/' + this.userService.getUserSession().uid + '/uploads';
        return this.deleteUploadFromColl(uploadId, collection)
          .then(() => Promise.resolve('success'))
          .catch(error => Promise.reject(error))
      }
    }))
  }


  onSuccess(message: string) {
    this.snackBarService.onOpenSnackBar.next({ message: message, isError: false });
  }

  onError(message: string, error: any) {
    this.snackBarService.onOpenSnackBar.next({ message: message, isError: true });
    console.log(error);
  }

}
