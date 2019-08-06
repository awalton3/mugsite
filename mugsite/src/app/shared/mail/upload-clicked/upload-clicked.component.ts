import { Component, OnInit, Output, Input, HostListener } from '@angular/core';
import { Subject } from 'rxjs';
import { Upload } from 'src/app/mughub/tutor-app/uploads/upload.model';
import { UploadService } from '../upload/upload.service';
import { User } from 'src/app/mughub/auth/user.model';

@Component({
  selector: 'mughub-upload-clicked',
  templateUrl: './upload-clicked.component.html',
  styleUrls: ['./upload-clicked.component.css']
})
export class UploadClickedComponent implements OnInit {

  @Input() upload: Upload;
  @Input() parent: string;
  @Output() onBack = new Subject();
  screenWidth: number;
  mediaBreakpoint: number = 599;

  @HostListener('window:resize', ['$event'])
  onResize() {
    this.screenWidth = window.innerWidth;
    this.getUploadContentWidth();
  }

  constructor(private uploadService: UploadService) { }

  ngOnInit() {
    this.screenWidth = window.innerWidth;
    this.getUploadContentWidth();
  }

  getUploadContentWidth() {
    let targetWidth: number;

    if (window.innerWidth > 960)
      targetWidth = window.innerWidth - 600;
    else if (window.innerWidth < 960 && window.innerWidth > 550)
      targetWidth = window.innerWidth - 230;
    else
      targetWidth = window.innerWidth - 170;

    let elements = document.getElementsByClassName('truncate');
    Object.keys(document.getElementsByClassName('truncate')).map(element => {
      elements[element].style.maxWidth = targetWidth + 'px';
    });
  }

  getRecipientsFormatted(recipientsObjs: User[]) {
    return this.uploadService.getRecipientsAsString(recipientsObjs);
  }

  onToggleBack() {
    this.onBack.next();
  }

}