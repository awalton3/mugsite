import { Component, OnInit, Input, OnDestroy, Output } from '@angular/core';
import { AttachmentService } from './attachments.service';
import { Attachment } from './attachment.model';
import { UserService } from 'src/app/mughub/auth/user.service';
import { Subscription, Subject } from 'rxjs';

@Component({
  selector: 'mughub-attachments',
  templateUrl: './attachments.component.html',
  styleUrls: ['./attachments.component.css']
})
export class AttachmentsComponent implements OnInit, OnDestroy {

  private subs = new Subscription();
  @Input() attachments: Attachment[] = [];
  @Output() attachmentsSub = new Subject<Attachment[]>();
  @Output() attachmentsToRemoveSub = new Subject<Attachment[]>();
  attachmentsToRemoveFromStorage: Attachment[] = [];
  @Input() removable?: boolean = false;
  @Output() onAttach = new Subject<Attachment>();
  selectable: boolean = true;

  constructor(
    private attachmentService: AttachmentService,
    private userService: UserService
  ) { }

  ngOnInit() {
    this.listenForAttachmentsRequests();
    this.listenForAttachmentsToRemoveRequests();
  }

  listenForAttachmentsRequests() {
    this.subs.add(this.attachmentService.onAttachmentsRequest.subscribe(() => {
      this.attachmentsSub.next(this.attachments);
    }))
  }

  listenForAttachmentsToRemoveRequests() {
    this.subs.add(this.attachmentService.onAttachmentsToRemoveRequest.subscribe(() => {
      this.attachmentsToRemoveSub.next(this.attachmentsToRemoveFromStorage);
    }))
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
    if (!this.removable)
      this.attachmentService.downloadAttachment(attachmentRefs);
  }

  onAttachmentUpload(onFileUpload: { target: { files: any[]; }; }) {
    const file = onFileUpload.target.files[0];
    const doesFileExist = this.attachments.some(attachment => attachment.displayName === file.name);
    if (!doesFileExist) {
      const displayName = file.name;
      const storageRef = file.name + new Date().getTime();
      const newAttachment = new Attachment(displayName, storageRef, file);
      this.attachments.push(newAttachment);
    }
  }

  removeAttachmentChip(attachment: Attachment) {
    const index = this.attachments.indexOf(attachment);
    const isFileInStorage = !(!!(attachment.file));
    if (index >= 0) {
      this.attachments.splice(index, 1);
      if (isFileInStorage)
        this.attachmentsToRemoveFromStorage.push(attachment);
    }
  }

  clearFileList(event: { target: { value: any; }; }) {
    event.target.value = null;
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }

}
