import { Component, OnInit, Output, EventEmitter, ViewChild, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms';
import { AttachmentService } from 'src/app/shared/attachments/attachments.service';
import { MatSelectionList } from '@angular/material/list';
import { UploadService } from '../upload.service';

@Component({
  selector: 'mughub-upload-editor',
  templateUrl: './upload-editor.component.html',
  styleUrls: ['./upload-editor.component.css']
})
export class UploadEditorComponent implements OnInit, OnDestroy {

  uploadForm: FormGroup;
  attachments: string[] = [];

  @Output() onClose = new EventEmitter();
  @ViewChild('attachmentsList', { static: false }) attachmentsList: MatSelectionList;

  constructor(
    private attachmentService: AttachmentService,
    private uploadService: UploadService
  ) { }

  ngOnInit() {
    this.uploadForm = new FormGroup({
      'name': new FormControl(null, Validators.required),
      'subject': new FormControl(null, Validators.required),
      'assignment': new FormControl(null),
      'comments': new FormControl(null)
    });
    this.attachmentService.attachmentsChanged.subscribe(attachments => {
      this.attachments = attachments;
    })
  }

  onSubmit() {
    this.uploadService.addUpload(this.uploadForm.value, this.attachments)
      .then(() => {
        this.attachmentService.uploadAttachmentsToFb()
        this.onClose.emit();
      })
      .catch(error => console.log(error))
  }

  onFileUpload(onFileUpload /* event */) {
    let file = onFileUpload.target.files[0];
    this.attachmentService.addAttachment(file);
  }

  onFilesDelete() {
    this.attachmentService.deleteAttachments(this.attachmentsList.selectedOptions.selected);
  }

  ngOnDestroy() {
    this.attachmentService.attachmentsChanged.unsubscribe();
  }

}
