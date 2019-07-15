import { Component, OnInit, Output, EventEmitter, ViewChild, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms';
import { AttachmentService } from 'src/app/shared/attachments/attachments.service';
import { MatSelectionList } from '@angular/material/list';
import { UploadService } from '../upload.service';
import { Upload } from '../upload.model';
import { Subscription, Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';
import { UserService } from 'src/app/mughub/auth/user.service';
import { User } from 'src/app/mughub/auth/user.model';

@Component({
  selector: 'mughub-upload-editor',
  templateUrl: './upload-editor.component.html',
  styleUrls: ['./upload-editor.component.css']
})
export class UploadEditorComponent implements OnInit, OnDestroy {

  private subs = new Subscription();

  uploadForm: FormGroup;
  attachments: string[] = [];
  uploadToEdit: Upload;
  isEditMode: boolean = false;
  connections: User[] = [];
  connectionNames: string[] = [];
  filteredOptions: Observable<User[]>;


  @Output() onClose = new EventEmitter();
  @ViewChild('attachmentsList', { static: false }) attachmentsList: MatSelectionList;

  constructor(
    private attachmentService: AttachmentService,
    private uploadService: UploadService,
    private userService: UserService
  ) { }

  ngOnInit() {
    this.initForm();
    this.getUploadToEdit();
    this.listenForAttachmentChanges();
    this.initAutoComp();
    this.connections = this.userService.getUserSession().connections;
    this.getConnectionNames();
  }

  initForm() {
    this.uploadForm = new FormGroup({
      'userTo': new FormControl(null, [Validators.required, this.ValidateConnection.bind(this)]),
      'subject': new FormControl(null, Validators.required),
      'assignment': new FormControl(null),
      'comments': new FormControl(null)
    });
  }

  initFormForEdit() {
    this.uploadForm = new FormGroup({
      'userTo': new FormControl(this.uploadToEdit.userTo, [Validators.required, this.ValidateConnection.bind(this)]),
      'subject': new FormControl(this.uploadToEdit.subject, Validators.required),
      'assignment': new FormControl(this.uploadToEdit.assignment),
      'comments': new FormControl(this.uploadToEdit.comments)
    });
  }

  getUploadToEdit() {
    this.subs.add(this.uploadService.uploadClicked.subscribe(upload => {
      this.uploadToEdit = upload;
      this.isEditMode = true;
      this.initFormForEdit();
      this.attachmentService.initAttachmentsListView(this.uploadToEdit.attachments);
    }));
  }

  getConnectionNames() {
    this.connections.map(connection => this.connectionNames.push(connection.name))
  }

  listenForAttachmentChanges() {
    this.subs.add(this.attachmentService.attachmentsChanged.subscribe(attachments => {
      this.attachments = attachments;
    }));
  }

  initAutoComp() {
    this.filteredOptions = this.uploadForm.controls.userTo.valueChanges
      .pipe(
        startWith(''),
        map(value => this.filterAutoComp(value))
      );
  }

  filterAutoComp(value: string) {
    if (this.connections) {
      const filterValue = value.toLowerCase();
      return this.connections.filter(connection => connection.name.toLowerCase().includes(filterValue));
    }
  }

  ValidateConnection(control: AbstractControl) {
    return this.connectionNames.includes(control.value) ? null : { validConnection: false };
  }

  onSubmit() {
    this.isEditMode ? this.updateUpload() : this.addUpload();
  }

  addUpload() {
    this.uploadService.addUpload(this.uploadForm.value, this.attachments)
      .then(() => this.onSuccess('add'))
      .catch(error => console.log(error))
  }

  updateUpload() {
    let updateObj = Object.assign(this.getChangedFields(), this.getChangedAttachments());
    this.uploadService.editUpload(this.uploadToEdit.id, updateObj)
      .then(() => this.onSuccess('update'))
      .catch(error => console.log(error))
  }

  onSuccess(action: string) {
    if (action === 'add' || action === 'update') {
      this.attachmentService.uploadAttachmentsToFb();
      this.attachmentService.deleteAttachmentsInFb(this.attachmentService.getAttachmentsToDelete());
    }
    if (action === 'delete') {
      this.attachmentService.deleteAttachmentsInFb(this.uploadToEdit.attachments);
    }
    this.onClose.emit();
    this.uploadForm.reset();
    this.attachmentService.reset();
    this.isEditMode = false;
  }

  getChangedFields() {
    let changedFields = {};
    Object.keys(this.uploadForm.controls).map(field => {
      if (!this.uploadForm.controls[field].pristine) {
        changedFields[field] = this.uploadForm.value[field];
      }
    });
    return changedFields;
  }

  getChangedAttachments() {
    let changedAttachments = {};
    if (this.attachmentService.ifAttachmentsChanged())
      changedAttachments['attachments'] = this.attachmentService.getAttachments();
    return changedAttachments;
  }

  onCancel() {
    this.onClose.emit();
    this.uploadForm.reset();
    this.attachmentService.reset();
    this.isEditMode = false;
  }

  onDeleteUpload() {
    this.uploadService.deleteUpload(this.uploadToEdit.id)
      .then(() => this.onSuccess('delete'))
      .catch(error => console.log(error))
  }

  onAttachmentUpload(onFileUpload /* event */) {
    let file = onFileUpload.target.files[0];
    if (!this.attachments.includes(file.name))
      this.attachmentService.addAttachment(file);
    else {
      console.log('attachment has already been added');
    }
  }

  onAttachmentsDelete() {
    this.attachmentService.deleteAttachments(this.attachmentsList.selectedOptions.selected);
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }

}
