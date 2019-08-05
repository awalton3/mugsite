import { Subject, throwError } from 'rxjs';
import { MatListOption } from '@angular/material/list';
import { Injectable } from '@angular/core';
import * as firebase from 'firebase/app';
import { UserService } from 'src/app/mughub/auth/user.service';
import { take, map, catchError } from 'rxjs/operators';
import { CompressImagesService } from '../compress-images.service';
import { AngularFireStorage } from '@angular/fire/storage';
import { SnackBarService } from '../snack-bar/snack-bar.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({ providedIn: 'root' })

export class AttachmentService {

  constructor(
    private userService: UserService,
    private compressImagesService: CompressImagesService,
    private storage: AngularFireStorage,
    private snackBarService: SnackBarService,
    private http: HttpClient,
  ) { }

  private attachmentsListView: string[] = [];
  private attachmentsToDelete: Set<string> = new Set();
  private attachmentsToAdd: Set<File> = new Set();
  attachmentsChanged = new Subject<string[]>();


  getAttachments() {
    return this.attachmentsListView.slice();
  }

  getAttachmentsToDelete() {
    return this.attachmentsToDelete;
  }

  ifAttachmentsChanged() {
    return this.attachmentsToAdd.size !== 0 || this.attachmentsToDelete.size !== 0;
  }

  initAttachmentsListView(initialAttachments: string[]) {
    this.attachmentsListView = initialAttachments;
    this.attachmentsChanged.next(this.attachmentsListView);
  }

  addAttachment(file: File) {
    this.attachmentsListView.push(file.name);
    this.attachmentsToAdd.add(file);
    this.attachmentsChanged.next(this.attachmentsListView);
  }

  deleteAttachments(attachments: MatListOption[]) {
    attachments.map((attachment: MatListOption, index: number) => {
      this.attachmentsToDelete.add(this.attachmentsListView[attachment.value - index]);
      this.attachmentsListView.splice(attachment.value - index, 1);
    });
    this.attachmentsChanged.next(this.attachmentsListView);
  }

  uploadAttachmentsToFb() {
    Array.from(this.attachmentsToAdd).map(attachment => {
      firebase.storage().ref(attachment.name + this.userService.getUserSession().uid).put(attachment)
        .then(() => { console.log('success') })
        .catch(error => console.log(error))
    })
  }

  deleteAttachmentsInFb(attachmentsToDelete) {
    Array.from(attachmentsToDelete).map(nameRef => {
      firebase.storage().ref().child(nameRef + this.userService.getUserSession().uid).delete()
        .then(() => console.log('success'))
        .catch(error => console.log(error))
    })
  }

  reset() {
    this.attachmentsListView = [];
    this.attachmentsToAdd = new Set();
    this.attachmentsToDelete = new Set();
    this.attachmentsChanged.next(this.attachmentsListView);
  }


  /* NEW */

  uploadAttachments(attachments: File[], attachmentRefs: { displayName: string, storageRef: string }[]) {
    return Promise.all(attachments.map((attachment, index) => {
      if (this.compressImagesService.isFileImage(attachment)) {
        this.compressImagesService.compressImage(attachment)
          .then(observable => observable
            .pipe(take(1))
            .subscribe(image => {
              return this.storage.ref(attachmentRefs[index].storageRef).putString(image.compressedImage.imageDataUrl, 'data_url');
            }))
      } else {
        return this.storage.ref(attachmentRefs[index].storageRef).put(attachment);
      }
    }));
  }

  getAttachmentNameRefs(attachments: File[]) {
    return attachments.map((attachment: File) => {
      let storageRef = attachment.name + new Date().getTime() + this.userService.getUserSession().uid;
      return { displayName: attachment.name, storageRef: storageRef };
    });
  }

  downloadAttachment(attachmentRefs: { displayName: string, storageRef: string }) {
    this.storage.ref(attachmentRefs.storageRef).getDownloadURL()
      .pipe(take(1))
      .subscribe(url => {
        this.performRequest(url, attachmentRefs.displayName)
      }, error => this.handleErrors(error.code))
  }

  performRequest(url: string, filename: string) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'blob';
    xhr.onload = function(event) {
      const blob = this.response;
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      document.body.appendChild(a);
      a.setAttribute('style', 'display: none');
      a.href = url;
      a.download = filename;
      a.click();
      window.URL.revokeObjectURL(url);
      a.remove();
    };
    xhr.open('GET', url);
    xhr.send();
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
