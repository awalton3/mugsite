import { Injectable } from '@angular/core';
// import * as firebase from 'firebase/app';
// import 'firebase/firestore';
import { AngularFirestore } from '@angular/fire/firestore';
import { UserService } from 'src/app/mughub/auth/user.service';
import { SnackBarService } from '../snack-bar/snack-bar.service';
import { AngularFireStorage } from '@angular/fire/storage';
import { ImageCompressService } from 'ng2-image-compress';
import { take } from 'rxjs/operators';


@Injectable({ providedIn: 'root' })

export class MailService {

  // uploadClicked = new Subject<Upload>();
  //

  constructor(
    private db: AngularFirestore,
    private storage: AngularFireStorage,
    private userService: UserService,
    private snackBarService: SnackBarService
  ) { }

  async uploadMessage(recipients /* of type User[] */, subject: string, body: string, attachments: File[]) {
    let attachmentNameRefs = this.getAttachmentNameRefs(attachments);
    try {
      await this.db.collection('/uploads')
        .doc(this.db.createId())
        .set({
          sender: Object.assign({}, this.userService.getUserSession()),
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

  getAttachmentNameRefs(attachments: File[]): string[] {
    return attachments.map((attachment: File) => {
      return attachment.name + new Date().getTime() + this.userService.getUserSession().uid;
    });
  }

  onSuccessUpload(attachments: File[], attachmentNameRefs: string[]) {
    this.uploadAttachments(attachments, attachmentNameRefs)
      .then(() => this.onSuccess('Message Sent'))
      .catch(error => this.onError('An error occured in uploading your attachments.', error))
    //TODO need better error handling and info for user.
  }

  uploadAttachments(attachments: File[], attachmentNameRefs: string[]) {
    return Promise.all(attachments.map((attachment, index) => {
      if (this.isFileImage(attachment)) {
        this.compressImage(attachment)
          .then(observable => observable
            .pipe(take(1))
            .subscribe(image => {
              return this.storage.ref(attachmentNameRefs[index]).putString(image.compressedImage.imageDataUrl, 'data_url');
            }))
      } else {
        return this.storage.ref(attachmentNameRefs[index]).put(attachment);
      }
    }));
  }

  isFileImage(file: File) {
    const fileArr = file['type'].split('/');
    const acceptedFileTypes = ['jpg', 'jpeg', 'png'];
    return file && fileArr[0] === 'image' && acceptedFileTypes.includes(fileArr[1]);
  }

  compressImage(attachment: File) {
    return ImageCompressService.filesArrayToCompressedImageSource([attachment])
  }

  ifImageinSizeRange(imageDataUrl: string) {
    let base64Length = imageDataUrl.length - (imageDataUrl.indexOf(',') + 1);
    let padding = (imageDataUrl.charAt(imageDataUrl.length - 2) === '=') ? 2 : ((imageDataUrl.charAt(imageDataUrl.length - 1) === '=') ? 1 : 0);
    return (base64Length * 0.75 - padding) <= 1000000;
  }

  onSuccess(message: string) {
    this.snackBarService.onOpenSnackBar.next({ message: message, isError: false });
  }

  onError(message: string, error: any) {
    this.snackBarService.onOpenSnackBar.next({ message: message, isError: true });
    console.log(error);
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
