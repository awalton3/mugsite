import { Component, OnInit, Input, Output, HostListener } from '@angular/core';
import { Subject } from 'rxjs';
import { AttachmentService } from '../../attachments/attachments.service';
import { Upload } from './upload.model';

@Component({
  selector: 'mughub-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css']
})
export class UploadComponent implements OnInit {

  @Input() upload: Upload = null;
  @Input() currIndex: number = null;
  @Input() numOfUploads: number = null;
  @Input() parent?: string = null;
  @Output() finished = new Subject();
  screenWidth: number;
  selectable: boolean = true;
  uploadRecipients: string;

  @HostListener('window:resize', ['$event'])
  onResize() {
    this.getUploadContentWidth();
  }

  constructor(private attachmentService: AttachmentService) { }

  ngOnInit() {
    console.log(this.upload.recipients);
    this.getUploadContentWidth();
    this.uploadRecipients = this.upload.recipients.join(', ');
    console.log(this.upload.recipients)
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

  onDownloadAttachment(attachmentRefs: { displayName: string; storageRef: string; }) {
    this.attachmentService.downloadAttachment(attachmentRefs);
  }

}
