import { Component, OnInit, OnDestroy } from '@angular/core';
import { SidenavService } from 'src/app/mughub/sidenav/sidenav.service';
import { Upload } from 'src/app/mughub/tutor-app/uploads/upload.model';
import { Subscription } from 'rxjs';
import { QueryDocumentSnapshot } from '@angular/fire/firestore';
import { MailService } from '../mail.service';
import { UserService } from 'src/app/mughub/auth/user.service';
import { take } from 'rxjs/operators';
import { UploadService } from '../upload/upload.service';

@Component({
  selector: 'app-inbox',
  templateUrl: './inbox.component.html',
  styleUrls: ['./inbox.component.css']
})
export class InboxComponent implements OnInit, OnDestroy {

  private subs = new Subscription();
  uploads: Upload[];
  uploadClicked: Upload = null;

  constructor(
    private userService: UserService,
    private sidenavService: SidenavService,
    private mailService: MailService,
    private uploadService: UploadService
  ) { }

  ngOnInit() {
    this.listenForUploads();
  }

  listenForUploads() {
    this.subs.add(this.mailService.fetchInboxUploads().onSnapshot(querySnapshot => {
      let uploads = [];
      querySnapshot.forEach(uploadDoc => uploads.push(this.uploadService.createUploadObj(uploadDoc)));
      this.uploads = uploads;
    }))
  }

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
