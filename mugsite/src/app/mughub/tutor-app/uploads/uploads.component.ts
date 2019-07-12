import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { SidenavService } from '../../sidenav/sidenav.service';
import { UploadService } from './upload.service';
import { Upload } from './upload.model';

@Component({
  selector: 'app-uploads',
  templateUrl: './uploads.component.html',
  styleUrls: ['./uploads.component.css']
})
export class UploadsComponent implements OnInit, OnDestroy {

  uploads: Upload[] = [];
  uploadsListener: any;

  @ViewChild('editor', { static: false }) editor;

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
    this.uploadsListener = this.uploadService.fetchUploads()
      .onSnapshot(querySnapshot => {
        let uploads = [];
        querySnapshot.forEach(doc => {
          uploads.push(this.createUpload(doc));
        });
        this.uploads = uploads;
      }, error => { console.log(error) })
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
    this.uploadsListener();
  }

}
