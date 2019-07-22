import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { SidenavService } from '../../sidenav/sidenav.service';
import { UploadService } from './upload.service';
import { Upload } from './upload.model';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Query } from '@angular/fire/firestore';

@Component({
  selector: 'app-uploads',
  templateUrl: './uploads.component.html',
  styleUrls: ['./uploads.component.css']
})
export class UploadsComponent implements OnInit, OnDestroy{

  private subs = new Subscription();
  uploads: Upload[] = [];
  uploadsListener: any;
  uploadsEmpty: boolean;
  loading: boolean = true;

  @ViewChild('editor', { static: false }) editor: any;

  constructor(
    private sidenavService: SidenavService,
    private uploadService: UploadService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.getUploads(this.route.snapshot.data.uploads);
  }

  closeSidenav() {
    this.sidenavService.onToggle.next();
  }

  getUploads(uploadsQuery: Query) {
    this.subs.add(uploadsQuery
      .onSnapshot(querySnapshot => {
        let uploads = [];
        querySnapshot.forEach(doc => uploads.push(this.createUpload(doc)));
        this.uploads = uploads;
        this.uploadsEmpty = !!(this.uploads.length === 0)
        if(this.uploadsEmpty) this.loading = false;
      }, error => { console.log(error) }));
  }

  createUpload(uploadData) {
    let uploadObj = {};
    uploadObj['id'] = uploadData.id;
    Object.assign(uploadObj, uploadData.data());
    return uploadObj;
  }

  onUploadClick(upload: Upload) {
    this.uploadService.uploadClicked.next(upload);
    this.editor.toggle();
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }

}
