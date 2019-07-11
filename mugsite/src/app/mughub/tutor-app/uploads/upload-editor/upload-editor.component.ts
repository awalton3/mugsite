import { Component, OnInit, Output, EventEmitter, ViewChild, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AttachmentService } from 'src/app/shared/attachments/attachments.service';
import { MatSelectionList } from '@angular/material/list';
import { UploadService } from '../upload.service';
import { Upload } from '../upload.model';

@Component({
  selector: 'mughub-upload-editor',
  templateUrl: './upload-editor.component.html',
  styleUrls: ['./upload-editor.component.css']
})
export class UploadEditorComponent implements OnInit, OnDestroy {

  uploadForm: FormGroup;
  attachments: string[] = [];
  uploadToEdit: Upload;
  isEditMode: boolean = false;


  @Output() onClose = new EventEmitter();
  @ViewChild('attachmentsList', { static: false }) attachmentsList: MatSelectionList;

  constructor(
    private attachmentService: AttachmentService,
    private uploadService: UploadService
  ) { }

  ngOnInit() {
    this.uploadService.uploadClicked.subscribe(upload => {
      this.uploadToEdit = upload;
      this.isEditMode = true;
      this.initFormForEdit();
      this.attachmentService.initAttachmentsListView(this.uploadToEdit.attachments);
    });
    this.attachmentService.attachmentsChanged.subscribe(attachments => {
      this.attachments = attachments;
    })

    if (!this.isEditMode) this.initForm();
  }

  initForm() {
    this.uploadForm = new FormGroup({
      'userTo': new FormControl(null, Validators.required),
      'subject': new FormControl(null, Validators.required),
      'assignment': new FormControl(null),
      'comments': new FormControl(null)
    });
  }

  initFormForEdit() {
    this.uploadForm = new FormGroup({
      'userTo': new FormControl(this.uploadToEdit.userTo, Validators.required),
      'subject': new FormControl(this.uploadToEdit.subject, Validators.required),
      'assignment': new FormControl(this.uploadToEdit.assignment),
      'comments': new FormControl(this.uploadToEdit.comments)
    });
  }

  onSubmit() {
    this.isEditMode ? this.updateUpload() : this.addUpload();
  }

  addUpload() {
    this.uploadService.addUpload(this.uploadForm.value, this.attachments)
      .then(() => this.onSuccess())
      .catch(error => console.log(error))
  }

  updateUpload() {
    let updateObj = Object.assign(this.getChangedFields(), this.getChangedAttachments());
    this.uploadService.editUpload(this.uploadToEdit.id, updateObj)
      .then(() => this.onSuccess())
      .catch(error => console.log(error))
  }

  onSuccess() {
    this.attachmentService.uploadAttachmentsToFb();
    this.attachmentService.deleteAttachmentsInFb();
    this.onClose.emit();
    this.uploadForm.reset();
    this.attachmentService.reset();
  }

  onError() {

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
    this.isEditMode = false;
  }

  onDeleteUpload() {
    
  }

  onFileUpload(onFileUpload /* event */) {
    let file = onFileUpload.target.files[0];
    if (!this.attachments.includes(file.name))
      this.attachmentService.addAttachment(file);
    else {
      console.log('attachment has already been added');
    }
  }

  onFilesDelete() {
    this.attachmentService.deleteAttachments(this.attachmentsList.selectedOptions.selected);
  }

  ngOnDestroy() {
    this.uploadService.uploadClicked.unsubscribe();
    this.attachmentService.attachmentsChanged.unsubscribe();
  }

}
