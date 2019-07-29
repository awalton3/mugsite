import { Component, OnInit, OnDestroy } from '@angular/core';
import { SidenavService } from 'src/app/mughub/sidenav/sidenav.service';
import { Upload } from 'src/app/mughub/tutor-app/uploads/upload.model';
import { InboxService } from './inbox.service';
import { Subscription } from 'rxjs';

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
    private sidenavService: SidenavService,
    private inboxService: InboxService
  ) { }

  ngOnInit() {
    this.testUpload = new Upload(null, null, null, null, null, null, null, null, null);
    this.listenForUploads();
  }

  listenForUploads() {
    let uploads = [];
    this.subs.add(this.inboxService.fetchUploads().onSnapshot(querySnapshot => {
      querySnapshot.forEach(uploadDoc => uploads.push(uploadDoc))
      this.uploads = uploads;
      console.log(this.uploads);
    }))
  }

  closeSidenav() {
    this.sidenavService.onToggle.next();
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }

}