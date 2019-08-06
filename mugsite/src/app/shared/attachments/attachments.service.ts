import { Injectable } from '@angular/core';
import { UserService } from 'src/app/mughub/auth/user.service';
import { take } from 'rxjs/operators';
import { CompressImagesService } from '../compress-images.service';
import { AngularFireStorage } from '@angular/fire/storage';
import { SnackBarService } from '../snack-bar/snack-bar.service';
import { Attachment } from './attachment.model';
import { Subject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AttachmentService {

  onAttachmentsRequest = new Subject();

  constructor(
    private userService: UserService,
    private compressImagesService: CompressImagesService,
    private storage: AngularFireStorage,
    private snackBarService: SnackBarService
  ) { }

  /* NEW */
  uploadAttachments(attachments: Attachment[]) {
    return Promise.all(attachments.map(attachment => {
      if (attachment.file) {
        console.log(attachment)
        if (this.compressImagesService.isFileImage(attachment.file)) {
          this.compressImagesService.compressImage(attachment.file)
            .then(observable => observable
              .pipe(take(1))
              .subscribe(image => {
                return this.storage.ref(attachment.storageRef).putString(image.compressedImage.imageDataUrl, 'data_url');
              }))
        } else {
          return this.storage.ref(attachment.storageRef).put(attachment);
        }
      }
    }))
  }

  getAttachmentNameRefs(attachments: File[]): any {
    return attachments.map((attachment: File) => {
      let storageRef = attachment.name + new Date().getTime() + this.userService.getUserSession().uid;
      return { displayName: attachment.name, storageRef: storageRef };
    });
  }

  getAttachmentsForFbColl(attachments: Attachment[]) {
    return attachments.map(attachment => {
      let pureAttachment = { displayName: attachment.displayName, storageRef: attachment.storageRef };
      return pureAttachment;
    })
  }

  downloadAttachment(attachmentRefs: { displayName: string, storageRef: string }) {
    this.storage.ref(attachmentRefs.storageRef).getDownloadURL()
      .pipe(take(1))
      .subscribe(url => {
        this.performRequest(url, attachmentRefs.displayName)
          .then(() => this.snackBarService.onOpenSnackBar.next({ message: 'Attachment Downloaded', isError: false }))
          .catch(() => this.snackBarService.onOpenSnackBar.next({ message: 'Error in Downloading Attachment', isError: true }))
      }, error => this.handleErrors(error.code))
  }

  performRequest(url: string, filename: string) {
    return new Promise((resolve, reject) => {
      var xhr = new XMLHttpRequest();
      xhr.responseType = 'blob';
      xhr.onload = () => {
        if (xhr.status >= 200 && xhr.status < 300) {
          const blob = xhr.response;
          const url = window.URL.createObjectURL(blob);
          const a = document.createElement('a');
          document.body.appendChild(a);
          a.setAttribute('style', 'display: none');
          a.href = url;
          a.download = filename;
          a.click();
          window.URL.revokeObjectURL(url);
          a.remove();
          resolve(blob)
        } else {
          reject(xhr.statusText)
        }
      };
      xhr.onerror = () => reject(xhr.statusText);
      xhr.open('GET', url);
      xhr.send();
    });
  }

  getAttachmentMetadata(storageRef: string) {
    return this.storage.ref(storageRef).getMetadata();
  }

  handleErrors(error: any) {
    switch (error) {
      case 'storage/object-not-found':
        this.snackBarService.onOpenSnackBar.next({ message: 'Cannot download file because it does not exists.', isError: true });
        break;
      case 'storage/unauthorized':
        this.snackBarService.onOpenSnackBar.next({ message: 'You are unauthorized to access this file', isError: true });
        break;
      case 'storage/canceled':
        this.snackBarService.onOpenSnackBar.next({ message: 'Download canceled', isError: true });
        break;
      default:
        this.snackBarService.onOpenSnackBar.next({ message: 'Error Downloading File', isError: true });
        break;
    }
  }

}
