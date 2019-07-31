import { Component, OnInit, Output, OnDestroy } from '@angular/core';
import { Subject, Subscription } from 'rxjs';
import { UserService } from 'src/app/mughub/auth/user.service';
import { User } from 'src/app/mughub/auth/user.model';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ConnectionFormService } from '../connection-form/connection-form.service';

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
  selectedConnectionsOrig: User[] = [];
  @Output() onClose = new Subject();

  constructor(
    private userService: UserService,
    private connectionsFormService: ConnectionFormService
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
      this.selectedConnectionsOrig = connectionsObj.selectedConnectionsOrig;
    }));
  }

  listenToConnectionsValid() {
    this.subs.add(this.connectionsFormService.isformValid.subscribe(isFormValid => {
      this.connectionsValid = isFormValid;
    }));
  }

  onSubmit() {
    
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }

}
