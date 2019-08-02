import { Component, OnInit, Output, OnDestroy } from '@angular/core';
import { Subject, Subscription } from 'rxjs';
import { UserService } from 'src/app/mughub/auth/user.service';
import { User } from 'src/app/mughub/auth/user.model';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ConnectionFormService } from '../../connection-form/connection-form.service';
import { MailService } from '../mail.service';
import { take } from 'rxjs/operators';

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
  selectedConnections: User[] = [];
  attachments: any[] = []; //contains both strings and files
  compressedAttachment: string = '';
  removable = true;
  selectable = true;
  @Output() onClose = new Subject();

  constructor(
    private userService: UserService,
    private connectionsFormService: ConnectionFormService,
    private mailService: MailService
  ) { }

  ngOnInit() {
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

  onAttachmentUpload(onFileUpload /* event */) {
    let file = onFileUpload.target.files[0];
    if (!this.attachments.some(attachment => attachment.name === file.name))
      this.attachments.push(file);
  }

  isFileImage(file: File) {
    return file && file['type'].split('/')[0] === 'image';
  }

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
