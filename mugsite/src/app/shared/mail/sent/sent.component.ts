import { Component, OnInit } from '@angular/core';
import { MailService } from '../mail.service';
import { Subscription } from 'rxjs';
import { Upload } from '../upload/upload.model';
import { UserService } from 'src/app/mughub/auth/user.service';
import { take } from 'rxjs/operators';
import { QueryDocumentSnapshot } from '@angular/fire/firestore';
import { SidenavService } from 'src/app/mughub/sidenav/sidenav.service';
import { User } from 'src/app/mughub/auth/user.model';

@Component({
  selector: 'app-sent',
  templateUrl: './sent.component.html',
  styleUrls: ['./sent.component.css']
})
export class SentComponent implements OnInit {

  private subs = new Subscription();
  uploads: Upload[];
  uploadClicked: Upload;
  user: User;

  constructor(
    private mailService: MailService,
    private userService: UserService,
    private sidenavService: SidenavService
  ) { }

  ngOnInit() {
    this.user = this.userService.getUserSession();
    this.listenForUploads();
  }

  listenForUploads() {
    this.subs.add(this.mailService.fetchUserUploads().onSnapshot(querySnapshot => {
      let uploads = [];
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

  onUploadClick(upload: Upload) {
    this.uploadClicked = upload;
  }

  closeSidenav() {
    this.sidenavService.onToggle.next();
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }

}
