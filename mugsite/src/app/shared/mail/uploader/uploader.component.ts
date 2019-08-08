import { Component, OnInit, Output, OnDestroy, HostListener } from '@angular/core';
import { Subject, Subscription } from 'rxjs';
import { UserService } from 'src/app/mughub/auth/user.service';
import { User } from 'src/app/mughub/auth/user.model';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ConnectionFormService } from '../../connection-form/connection-form.service';
import { MailService } from '../mail.service';
import { first } from 'rxjs/operators';
import { UploadService } from '../upload/upload.service';
import { Attachment } from '../../attachments/attachment.model';
import { AttachmentService } from '../../attachments/attachments.service';

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
  possibleConnections: User[] = [];
  selectedConnections: string[] = [];
  selectedConnectionsOrig: string[] = [];
  attachments: Attachment[] = [];
  compressedAttachment: string = '';
  removable = true;
  selectable = true;
  requiredConnections = true;
  chipCharLimit: number;
  isEditMode: boolean = false;
  uploadToEditId: string;
  @Output() onClose = new Subject();

  @HostListener('window:resize', ['$event'])
  onResize() {
    this.getChipCharLimit();
  }

  constructor(
    private userService: UserService,
    private connectionsFormService: ConnectionFormService,
    private mailService: MailService,
    private uploadService: UploadService,
    private attachmentService: AttachmentService
  ) { }

  ngOnInit() {
    this.initForm();
    this.getChipCharLimit();
    this.user = this.userService.getUserSession();
    this.getPossibleConnections();
    this.listenToConnectionsValid();
    this.listenToSelectedConnections();
    this.listenForUploadToEdit();
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
      this.selectedConnectionsOrig = connectionsObj.selectedConnectionsOrig;
    }));
  }

  listenToConnectionsValid() {
    this.subs.add(this.connectionsFormService.isformValid.subscribe(isFormValid => {
      this.connectionsValid = isFormValid;
    }));
  }

  listenForUploadToEdit() {
    this.subs.add(this.uploadService.uploadToEdit.subscribe(uploadToEdit => {
      this.isEditMode = true;
      this.uploadToEditId = uploadToEdit.id;
      this.connectionsFormService.onInitForEdit.next(uploadToEdit.recipients);
      this.uploadForm.controls.subject.setValue(uploadToEdit.subject);
      this.uploadForm.controls.body.setValue(uploadToEdit.body)
      this.attachments = uploadToEdit.attachments.map(attachment => new Attachment(attachment.displayName, attachment.stroageRef, null));
    }))
  }

  getPossibleConnections() {
    this.userService.getUserSession().connections.forEach(connectionId => {
      this.userService.getUserFromFbCollect(connectionId)
        .pipe(first())
        .subscribe(userObj => {
          this.possibleConnections.push(new User(
            userObj.data().name,
            userObj.data().photoUrl,
            userObj.data().email,
            userObj.data().type,
            userObj.data().uid,
            userObj.data().isNewUser,
            userObj.data().prefs,
            userObj.data().connections))
        })
    })
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

  onSubmit() {
    this.attachmentService.onAttachmentsRequest.next();
    let form = this.uploadForm.value;
    if (this.isEditMode)
      this.mailService.editMessage(this.uploadToEditId, this.getChangedFields())
    else
      this.mailService.uploadMessage(this.selectedConnections, form.body, form.subject, this.attachments);
    this.resetUploader();
  }

  getAttachments(event: Attachment[]) {
    this.attachments = event;
  }

  getChangedFields() {
    let changedFields = {};
    Object.keys(this.uploadForm.controls).map(field => {
      if (!this.uploadForm.controls[field].pristine)
        changedFields[field] = this.uploadForm.value[field];
    });
    if (this.selectedConnectionsOrig !== this.selectedConnections) {
      console.log('Before: ', this.selectedConnectionsOrig);
      console.log('Current: ', this.selectedConnections);
      console.log(JSON.stringify(this.selectedConnectionsOrig) === JSON.stringify(this.selectedConnections))
      changedFields['recipients'] = this.selectedConnections;
    }
    if (this.attachments.some(attachment => attachment.file !== null)) {
      changedFields['attachments'] = this.attachments;
    }
    return changedFields;
  }

  onCancel() {
    console.log(this.uploadForm.controls.subject.errors)
    this.resetUploader();
  }

  resetUploader() {
    this.onClose.next();
    this.connectionsFormService.resetConnectionForm.next();
    this.uploadForm.reset();
    this.attachments = [];
    this.isEditMode = false;
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }

}
