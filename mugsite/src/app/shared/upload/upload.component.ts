import { Component, OnInit, Input, Output, HostListener } from '@angular/core';
import { Upload } from 'src/app/mughub/tutor-app/uploads/upload.model';
import { Subject } from 'rxjs';

@Component({
  selector: 'mughub-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css']
})
export class UploadComponent implements OnInit {

  @Input() upload: Upload = null;
  @Input() currIndex: number = null;
  @Input() numOfUploads: number = null;
  @Output() finished = new Subject();
  screenWidth: number;

  @HostListener('window:resize', ['$event'])
  onResize() {
    this.getUploadContentWidth();
  }

  constructor() { }

  ngOnInit() {
    console.log(this.upload);
    this.getUploadContentWidth();

    // if (this.currIndex === this.numOfUploads - 1)
    //  this.finished.next();
    // this.creationMonth = this.getMonthStr(this.upload.creationDate.month);
  }

  getUploadContentWidth() {
    this.screenWidth = window.innerWidth;
    let targetWidth: number;

    if (window.innerWidth > 960)
      targetWidth = window.innerWidth - 700;
    else if (window.innerWidth < 960 && window.innerWidth > 550)
      targetWidth = window.innerWidth - 300;
    else
      targetWidth = window.innerWidth - 150;


    let elements = document.getElementsByClassName('upload-content');
    Object.keys(document.getElementsByClassName('upload-content')).map(element => {
      elements[element].style.maxWidth = targetWidth + 'px';
    });

    elements = document.getElementsByClassName('truncate ');
    Object.keys(document.getElementsByClassName('truncate ')).map(element => {
      elements[element].style.maxWidth = targetWidth + 'px';
    });
  }

}
