import { Injectable } from '@angular/core';
import { QueryDocumentSnapshot } from '@angular/fire/firestore';
import { UserService } from 'src/app/mughub/auth/user.service';
import { take } from 'rxjs/operators';
import { User } from 'src/app/mughub/auth/user.model';

@Injectable({providedIn: 'root'})

export class UploadService {

  constructor(private userService: UserService) {}

  createUploadObj(uploadData: QueryDocumentSnapshot<any>) {
    let uploadObj = {};
    uploadObj['id'] = uploadData.id;
    Object.assign(uploadObj, uploadData.data());
    uploadObj = this.getSenderAsUser(uploadData, uploadObj);
    uploadObj = this.getRecipientsAsUsers(uploadData, uploadObj);
    return uploadObj;
  }

  getSenderAsUser(uploadData: QueryDocumentSnapshot<any>, uploadObj: any) {
    this.userService.getUserFromFbCollect(uploadData.data().sender)
      .pipe(take(1))
      .subscribe(user => uploadObj['sender'] = user.data())
    return uploadObj
  }

  getRecipientsAsUsers(uploadData: QueryDocumentSnapshot<any>, uploadObj: any) {
    let newRecipientsArray = [];
    uploadData.data().recipients.forEach(recipientId => {
      this.userService.getUserFromFbCollect(recipientId)
        .pipe(take(1))
        .subscribe(user => {
          newRecipientsArray.push(user.data())
        })
    });
    uploadObj['recipients'] = newRecipientsArray;
    return uploadObj;
  }

  getRecipientsAsString(recipientsObjs: User[]) {
    let recipients = '';
    recipientsObjs.forEach((recipient, index) => {
      recipients = recipients + recipient.name;
      if (index !== recipientsObjs.length - 1)
        recipients = recipients + ', ';
    })
    return recipients;
  }

}
