import { Component, OnInit, Input, HostListener, Output } from '@angular/core';
import { UploadService } from '../upload/upload.service';
import { User } from 'src/app/mughub/auth/user.model';
import { Upload } from '../upload/upload.model';
import { Subject } from 'rxjs';
import { MailService } from '../mail.service';

@Component({
  selector: 'mughub-upload-clicked',
  templateUrl: './upload-clicked.component.html',
  styleUrls: ['./upload-clicked.component.css']
})
export class UploadClickedComponent implements OnInit {

  @Input() parent: string;
  @Input() upload: Upload;
  @Output() onEditUpload = new Subject();
  screenWidth: number;
  mediaBreakpoint: number = 599;

  @HostListener('window:resize', ['$event'])
  onResize() {
    this.screenWidth = window.innerWidth;
    this.getUploadContentWidth();
  }

  constructor(
    private uploadService: UploadService,
    private mailService: MailService
  ) { }

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

  getRecipientsFormattedWithEmail(recipientsObjs: User[]) {
    return this.uploadService.getRecipientsAsStringWithEmail(recipientsObjs);
  }

  onEdit() {
    this.onEditUpload.next();
    this.uploadService.uploadToEdit.next(this.upload);
  }

  onDelete() {
    this.mailService.addToTrash(this.upload);
  }

  onToggleBack() {
    this.uploadService.uploadClicked.next(null);
  }

}
