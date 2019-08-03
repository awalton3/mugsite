import { Component, OnInit, Output, OnDestroy, HostListener } from '@angular/core';
import { Subject, Subscription } from 'rxjs';
import { UserService } from 'src/app/mughub/auth/user.service';
import { User } from 'src/app/mughub/auth/user.model';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ConnectionFormService } from '../../connection-form/connection-form.service';
import { MailService } from '../mail.service';

@Component({
  selector: 'mughub-uploader',
  templateUrl: './uploader.component.html',
  styleUrls: ['./uploader.component.css']
})

export class UploaderComponent implements OnInit, OnDestroy {

  private subs = new Subscription();
  user: User;
  uploadForm: FormGroup = new FormGroup({});
  connectionsValid: boolean = false;
  selectedConnections: string[] = [];
  attachments: File[] = [];
  compressedAttachment: string = '';
  removable = true;
  selectable = true;
  chipCharLimit: number;
  @Output() onClose = new Subject();

  @HostListener('window:resize', ['$event'])
  onResize() {
    this.getChipCharLimit();
  }

  constructor(
    private userService: UserService,
    private connectionsFormService: ConnectionFormService,
    private mailService: MailService
  ) { }

  ngOnInit() {
    this.getChipCharLimit();
    this.user = this.userService.getUserSession();
    this.initForm();
    this.listenToConnectionsValid();
    this.listenToSelectedConnections();
  }

  initForm() {
    this.uploadForm = new FormGroup({
      'subject': new FormControl(null, [Validators.required, Validators.maxLength(80)]),
      'body': new FormControl(null, [Validators.required])
    })
  }

  listenToSelectedConnections() {
    this.subs.add(this.connectionsFormService.onConnectionsChanged.subscribe(connectionsObj => {
      this.selectedConnections = connectionsObj.selectedConnections;
    }));
  }

  listenToConnectionsValid() {
    this.subs.add(this.connectionsFormService.isformValid.subscribe(isFormValid => {
      this.connectionsValid = isFormValid;
    }));
  }

  getChipCharLimit() {
    if (window.innerWidth > 500) {
      this.chipCharLimit = 40;
    }
    else if (window.innerWidth > 460) {
      this.chipCharLimit = 34;
    }
    else if (window.innerWidth > 410) {
      this.chipCharLimit = 28;
    }
    else if (window.innerWidth > 360) {
      this.chipCharLimit = 23;
    }
    else if (window.innerWidth > 310) {
      this.chipCharLimit = 18;
    } else if (window.innerWidth > 260) {
      this.chipCharLimit = 13;
    }
    else {
      this.chipCharLimit = 7;
    }
  }

  onAttachmentUpload(onFileUpload: { target: { files: any[]; }; }) {
    let file = onFileUpload.target.files[0];
    if (!this.attachments.some(attachment => attachment.name === file.name)) {
      this.attachments.push(file);
    }
  }

  clearFileList(event: { target: { value: any; }; }) {
    event.target.value = null;
  }

  // isFileImage(file: File) {
  //   return file && file['type'].split('/')[0] === 'image';
  // }

  removeAttachmentChip(attachment: File) {
    const index = this.attachments.indexOf(attachment);
    if (index >= 0) {
      this.attachments.splice(index, 1);
    }
  }

  onSubmit() {
    let form = this.uploadForm.value;
    this.mailService.uploadMessage(this.selectedConnections, form.body, form.subject, this.attachments);
    this.resetUploader();
  }

  onCancel() {
    this.resetUploader();
  }

  resetUploader() {
    this.onClose.next();
    this.connectionsFormService.resetConnectionForm.next();
    this.uploadForm.reset();
    this.attachments = [];
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }

}
