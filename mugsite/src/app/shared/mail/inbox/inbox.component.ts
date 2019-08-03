import { Component, OnInit, OnDestroy } from '@angular/core';
import { SidenavService } from 'src/app/mughub/sidenav/sidenav.service';
import { Upload } from 'src/app/mughub/tutor-app/uploads/upload.model';
import { InboxService } from './inbox.service';
import { Subscription } from 'rxjs';
import { QueryDocumentSnapshot } from '@angular/fire/firestore';
import { MailService } from '../mail.service';
import { UserService } from 'src/app/mughub/auth/user.service';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-inbox',
  templateUrl: './inbox.component.html',
  styleUrls: ['./inbox.component.css']
})
export class InboxComponent implements OnInit, OnDestroy {

  private subs = new Subscription();
  testUpload: Upload;
  uploads: Upload[];

  constructor(
    private userService: UserService,
    private sidenavService: SidenavService,
    private mailService: MailService
  ) { }

  ngOnInit() {
    this.listenForUploads();
  }

  listenForUploads() {
    let uploads = [];
    this.subs.add(this.mailService.fetchInboxUploads().onSnapshot(querySnapshot => {
      querySnapshot.forEach(uploadDoc => uploads.push(this.createUploadObj(uploadDoc)));
      this.uploads = uploads;
    }))
  }

  createUploadObj(uploadData: QueryDocumentSnapshot<any>) {
    let uploadObj = {};
    uploadObj['id'] = uploadData.id;
    Object.assign(uploadObj, uploadData.data());

    this.userService.getUserFromFbCollect(uploadData.data().sender)
      .pipe(take(1))
      .subscribe(user => uploadObj['sender'] = user.data())

    uploadData.data().recipients.forEach(recipientId => {
      this.userService.getUserFromFbCollect(recipientId)
        .pipe(take(1))
        .subscribe(user => uploadObj['recipients'] = user.data())
    });

    return uploadObj;
  } /* add */

  closeSidenav() {
    this.sidenavService.onToggle.next();
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }

}
