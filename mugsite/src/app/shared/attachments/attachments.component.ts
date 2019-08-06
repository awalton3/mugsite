import { Component, OnInit, Input } from '@angular/core';
import { AttachmentService } from './attachments.service';

@Component({
  selector: 'mughub-attachments',
  templateUrl: './attachments.component.html',
  styleUrls: ['./attachments.component.css']
})
export class AttachmentsComponent implements OnInit {

  @Input() attachments: any[] = [];

  constructor(private attachmentService: AttachmentService) { }

  ngOnInit() {
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