import { Component, OnInit, Input, Output, HostListener, AfterViewInit } from '@angular/core';
import { Upload } from 'src/app/mughub/tutor-app/uploads/upload.model';
import { Subject } from 'rxjs';

@Component({
  selector: 'mughub-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css']
})
export class UploadComponent implements OnInit, AfterViewInit {

  @Input() upload: Upload = null;
  @Input() currIndex: number = null;
  @Input() numOfUploads: number = null;
  @Output() finished = new Subject();
  creationMonth: string;

  @HostListener('window:resize', ['$event'])
  onResize() {
    this.getUploadContentWidth();
  }

  constructor() { }

  ngOnInit() {
    this.getUploadContentWidth();

    // if (this.currIndex === this.numOfUploads - 1)
    //  this.finished.next();
    // this.creationMonth = this.getMonthStr(this.upload.creationDate.month);
  }

  ngAfterViewInit() {
  }

  getUploadContentWidth() {

    let targetWidth: number;

    if (window.innerWidth > 960)
      targetWidth = window.innerWidth - 700;
    else if (window.innerWidth < 960 && window.innerWidth > 550)
      targetWidth = window.innerWidth - 300;
    else
      targetWidth = window.innerWidth - 150;


    let elements = document.getElementsByClassName('upload-content');
    Object.keys(document.getElementsByClassName('upload-content')).map(element => {
      elements[element].style.width = targetWidth + 'px';
    });
    
  }

  getMonthStr(monthNum: number) {
    let months = ['jan', 'feb', 'mar', 'apr', 'may', 'jun', 'jul', 'aug', 'sep', 'oct', 'nov', 'dec'];
    return months[monthNum - 1];
  }

}
