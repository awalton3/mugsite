import { Component, OnInit, Output, OnDestroy, HostListener } from '@angular/core';
import { Subject, Subscription } from 'rxjs';
import { UserService } from 'src/app/mughub/auth/user.service';
import { User } from 'src/app/mughub/auth/user.model';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ConnectionFormService } from '../../connection-form/connection-form.service';
import { MailService } from '../mail.service';
import { first } from 'rxjs/operators';

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
    this.initForm();
    this.getChipCharLimit();
    this.user = this.userService.getUserSession();
    this.getPossibleConnections();
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

  onAttachmentUpload(onFileUpload: { target: { files: any[]; }; }) {
    let file = onFileUpload.target.files[0];
    if (!this.attachments.some(attachment => attachment.name === file.name)) {
      this.attachments.push(file);
    }
  }

  removeAttachmentChip(attachment: File) {
    const index = this.attachments.indexOf(attachment);
    if (index >= 0) {
      this.attachments.splice(index, 1);
    }
  }

  clearFileList(event: { target: { value: any; }; }) {
    event.target.value = null;
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
