import { Component, OnInit, OnDestroy } from '@angular/core';
import { SidenavService } from 'src/app/mughub/sidenav/sidenav.service';
import { Upload } from 'src/app/mughub/tutor-app/uploads/upload.model';
import { Subscription } from 'rxjs';
import { UploadService } from '../upload/upload.service';
import { ActivatedRoute } from '@angular/router';
import { Query } from '@angular/fire/firestore';

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
    private sidenavService: SidenavService,
    private uploadService: UploadService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.listenForUploads(this.route.snapshot.data.uploads);
  }

  listenForUploads(uploadQuery: Query) {
    this.subs.add(uploadQuery.onSnapshot(querySnapshot => {
      let uploads = [];
      querySnapshot.forEach(uploadDoc => uploads.push(this.uploadService.createUploadObj(uploadDoc)));
      this.uploads = uploads;
    }, error => console.log(error)))
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
