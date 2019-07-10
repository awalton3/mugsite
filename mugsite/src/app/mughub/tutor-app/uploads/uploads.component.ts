import { Component, OnInit, OnDestroy } from '@angular/core';
import { SidenavService } from '../../sidenav/sidenav.service';
import { UploadService } from './upload.service';
import { QueryDocumentSnapshot } from '@angular/fire/firestore';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-uploads',
  templateUrl: './uploads.component.html',
  styleUrls: ['./uploads.component.css']
})
export class UploadsComponent implements OnInit, OnDestroy {

  uploads: QueryDocumentSnapshot<any>[] = [];
  uploadsSub: Subscription

  constructor(
    private sidenavService: SidenavService,
    private uploadService: UploadService
  ) { }

  ngOnInit() {
    this.uploadsSub = this.uploadService.fetchUploads()
      .subscribe(uploads => {
        this.uploads = uploads.docs;
      })
  }

  closeSidenav() {
    this.sidenavService.onToggle.next();
  }

  ngOnDestroy() {
    this.uploadsSub.unsubscribe();
  }

}
