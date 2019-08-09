import { Component, OnInit, OnDestroy } from '@angular/core';
import { SidenavService } from 'src/app/mughub/sidenav/sidenav.service';
import { Subscription } from 'rxjs';
import { UploadService } from '../upload/upload.service';
import { ActivatedRoute } from '@angular/router';
import { Query } from '@angular/fire/firestore';
import { Upload } from '../upload/upload.model';
import { MailService } from '../mail.service';

@Component({
  selector: 'app-inbox',
  templateUrl: './inbox.component.html',
  styleUrls: ['./inbox.component.css']
})
export class InboxComponent implements OnInit, OnDestroy {

  private subs = new Subscription();
  uploadClicked: Upload = null;
  uploads: Upload[];

  constructor(
    private sidenavService: SidenavService,
    private uploadService: UploadService,
    private mailService: MailService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.listenForUploads();
    this.listenForUploadClicked();
  }

  listenForUploadClicked() {
    this.subs.add(this.uploadService.uploadClicked.subscribe(uploadClicked => {
      this.uploadClicked = uploadClicked;
    }))
  }

  listenForUploads() {
    this.subs.add(this.mailService.fetchInboxUploads()
      .onSnapshot(querySnapshot => {
        let uploads = [];
        querySnapshot.forEach(uploadDoc => uploads.push(this.uploadService.createUploadObj(uploadDoc)));
        this.uploads = uploads;
      }, error => console.log(error)))
  }

  onUploadClick(upload: Upload) {
    this.uploadService.uploadClicked.next(upload);
    if (upload.unread) {
      console.log('yoooooo whoooo')
      this.mailService.editMessage(upload.id, { unread: false }, []);
    }
  }

  closeSidenav() {
    this.sidenavService.onToggle.next();
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }

}
