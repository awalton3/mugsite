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

  uploads: any[] = [];
  uploadsSub: Subscription

  constructor(
    private sidenavService: SidenavService,
    private uploadService: UploadService
  ) { }

  ngOnInit() {
    this.getUploads(); 
  }

  closeSidenav() {
    this.sidenavService.onToggle.next();
  }

  getUploads() {
    this.uploadService.fetchUploads()
      .onSnapshot(querySnapshot => {
        this.uploads = [];
        querySnapshot.forEach(doc => {
          this.uploads.push(doc.data());
        });
      }, error => { console.log(error) })
  }

  ngOnDestroy() {

  }

}
