import { Component, OnInit, Input, HostListener } from '@angular/core';
import { AttachmentService } from '../../attachments/attachments.service';
import { Upload } from './upload.model';
import { User } from 'src/app/mughub/auth/user.model';

@Component({
  selector: 'mughub-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css']
})
export class UploadComponent implements OnInit {

  // @Input() currIndex: number = null;
  // @Input() numOfUploads: number = null;
  @Input() upload: Upload;
  @Input() parent?: string = null;
  // @Output() finished = new Subject();
  screenWidth: number;
  selectable: boolean = true;
  attachmentIcon: string;

  @HostListener('window:resize', ['$event'])
  onResize() {
    this.getUploadContentWidth();
  }

  constructor(private attachmentService: AttachmentService) { }

  ngOnInit() {
    // this.getRecipientsAsString();
    this.getUploadContentWidth();
  }

  getRecipientsAsString(recipientsObjs: User[]) {
    let recipients = '';
    recipientsObjs.forEach((recipient, index) => {
      recipients = recipients + recipient.name;
      if (index !== this.upload.recipients.length - 1)
        recipients = recipients + ', ';
    })
    return recipients;
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

  getAttachmentIcon(attachmentName: string) {
    const nameArr = attachmentName.split('.');
    const fileType = nameArr[nameArr.length - 1];
    switch (fileType) {
      case 'svg':
      case 'png':
      case 'jpeg':
      case 'jpg':
      case 'gif': return 'file-image';
        break;
      case 'pdf': return 'file-pdf';
        break;
      case 'key':
      case 'odp':
      case 'pps':
      case 'ppt':
      case 'pptx': return 'file-powerpoint';
        break;
      case 'ods':
      case 'xlr':
      case 'xls':
      case 'xlsx': return 'file-excel';
        break;
      case 'doc':
      case 'docx':
      case 'odt': return 'file-word'
        break;
      default: return 'file'
    }
  }

  onDownloadAttachment(attachmentRefs: { displayName: string; storageRef: string; }) {
    this.attachmentService.downloadAttachment(attachmentRefs);
  }

}
