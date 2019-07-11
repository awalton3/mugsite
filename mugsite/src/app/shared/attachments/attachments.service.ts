import { Subject } from 'rxjs';
import { MatListOption } from '@angular/material/list';
import { AngularFireStorage } from '@angular/fire/storage';
import { Injectable } from '@angular/core';
import * as firebase from 'firebase/app';
import { UserService } from 'src/app/mughub/auth/user.service';

@Injectable({ providedIn: 'root' })

export class AttachmentService {

  constructor(
    private fbStorage: AngularFireStorage,
    private userService: UserService
  ) { }

  private attachmentsListView: string[] = [];
  private attachmentsToDelete: Set<string> = new Set();
  private attachmentsToAdd: Set<File> = new Set();

  attachmentsChanged = new Subject<string[]>();

  getAttachments() {
    return this.attachmentsListView.slice();
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
      this.fbStorage.ref(attachment.name + this.userService.getUserSession().uid).put(attachment)
        .then(() => { console.log('success') })
        .catch(error => console.log(error))
    })
  }

  deleteAttachmentsInFb() {
    Array.from(this.attachmentsToDelete).map(nameRef => {
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

}
