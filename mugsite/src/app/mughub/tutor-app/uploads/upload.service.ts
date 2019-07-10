import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { UserService } from '../../auth/user.service';

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
        attachments: attachmentNameRefs
      });
  }

}
