import { Component, OnInit, Input, HostListener } from '@angular/core';
import { Upload } from './upload.model';
import { User } from 'src/app/mughub/auth/user.model';
import { UploadService } from './upload.service';

@Component({
  selector: 'mughub-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css']
})
export class UploadComponent implements OnInit {

  @Input() upload: Upload;
  @Input() parent?: string = null;
  screenWidth: number;
  selectable: boolean = true;
  attachmentIcon: string;

  @HostListener('window:resize', ['$event'])
  onResize() {
    this.getUploadContentWidth();
  }

  constructor(private uploadService: UploadService) { }

  ngOnInit() {
    this.getUploadContentWidth();
  }

  getRecipientsFormatted(recipientsObjs: User[]) {
    return this.uploadService.getRecipientsAsString(recipientsObjs);
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

    elements = document.getElementsByClassName('truncate');
    Object.keys(document.getElementsByClassName('truncate')).map(element => {
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

}
