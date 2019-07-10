import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { MatBottomSheetRef, MAT_BOTTOM_SHEET_DATA } from '@angular/material/bottom-sheet';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatSelectionList } from '@angular/material/list';
import { ManageService } from '../../manage.service';
import { MatRadioGroup } from '@angular/material/radio';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Attachment } from 'src/app/shared/attachments/attachment.model';

@Component({
  selector: 'editor-bottom-sheet-events',
  templateUrl: './editor-bottom-sheet-events.component.html',
  styleUrls: ['./editor-bottom-sheet-events.component.css']
})

export class EditorBottomSheetEventsComponent implements OnInit {

  editForm: FormGroup;
  placeholder = {
    title: 'Ex. Camp Funtastic 2019',
    description: 'Ex. $200 per child, Ages 9 - 14. Math intensives and fitness, writing and comic book design, environmetal science...',
    dateFrom: '07/09/2019',
    dateTo: '08/09/2019',
    location: 'Ex. 408 Addison Rd S, Capitol Heights, MD 20743',
    time: 'Ex.  4 - 7:30 pm Tuesdays, Wednesdays, Thursdays',
    contact: 'Ex. Call 301-***-**** / visit m-u-g.org.',
    instructions: 'Ex. Please fill out both forms below.'
  }
  minDateFrom = new Date(); //current date
  minDateTo: Date; //always same or date after dateFrom

  @ViewChild('dateOption', { static: false }) dateOption: MatRadioGroup;
  @ViewChild('attachmentsList', { static: false }) attachmentsList: MatSelectionList;

  attachments: Attachment[] = [];

  constructor(
    private bottomSheetRef: MatBottomSheetRef<EditorBottomSheetEventsComponent>,
    @Inject(MAT_BOTTOM_SHEET_DATA) public data: any,
    private manageService: ManageService,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit() {
    if (this.data.isEditMode)
      this.initFormWithValues();
    else {
      this.initForm();
    }
  }

  private initForm() {
    this.editForm = new FormGroup({
      'title': new FormControl(null, Validators.required),
      'description': new FormControl(null, Validators.required),
      'dateFrom': new FormControl(null, Validators.required),
      'dateTo': new FormControl(null),
      'location': new FormControl(null),
      'time': new FormControl(null),
      'contact': new FormControl(null),
      'instructions': new FormControl(null),
      'attachments': new FormControl(null),
      'dateOption': new FormControl('oneTime', Validators.required)
    })
  }

  private initFormWithValues() {

    let eventData = this.data.dataToEdit;
    let dateFrom = new Date()
    dateFrom.setDate(eventData.dateFrom.day);
    dateFrom.setMonth(eventData.dateFrom.month - 1)

    let dateTo = null;
    if (eventData.dateOption === 'extended') {
      dateTo = new Date();
      dateTo.setDate(eventData.dateTo.day);
      dateTo.setMonth(eventData.dateTo.month - 1);
    }

    this.getAttachmentsArrayOnEdit(eventData.attachments)

    this.editForm = new FormGroup({
      'title': new FormControl(eventData.title, Validators.required),
      'description': new FormControl(eventData.description, Validators.required),
      'dateFrom': new FormControl(dateFrom, Validators.required),
      'dateTo': new FormControl(dateTo),
      'location': new FormControl(eventData.location),
      'time': new FormControl(eventData.time),
      'contact': new FormControl(eventData.contact),
      'instructions': new FormControl(eventData.instructions),
      'attachments': new FormControl(eventData.attachments),
      'dateOption': new FormControl(eventData.dateOption, Validators.required)
    })
  }

  onCancel() {
    if (confirm("Performing this action will lose all changes that have been made."))
      this.bottomSheetRef.dismiss();
  }

  onSubmit() {
    //add
    if (!this.data.isEditMode) {
      this.manageService.addNewEvent(this.editForm.value, this.getAttachmentNameRefs())
        .then(() => {
          this.manageService.uploadAttachments(this.getAttachmentFileObjs());
          this.onActionSuccess("Event was successfully added.")
        })
        .catch(error => this.onActionError(error))
    } else {
      //edit
      this.manageService.updateEvent(this.getChangedFields(), this.data.docId)
        .then(() => this.onActionSuccess("Event was successfully updated."))
        .catch(error => this.onActionError(error))
    }
  }

  onDelete() {
    if (confirm("This action will permanently delete this event.")) {
      this.manageService.deleteEvent(this.data.docId)
        .then(() => this.onActionSuccess("The event was successfully deleted."))
        .catch(error => this.onActionError(error))
    }
  }

  getChangedFields() {
    let changedFields = {};

    console.log(this.editForm)

    Object.keys(this.editForm.controls).map(formField => {

      let edited = !this.editForm.controls[formField].pristine;
      let exists = !!this.editForm.controls[formField];
      let isDate = formField === 'dateFrom' || formField === 'dateTo'

      if (edited && exists && isDate) {
        changedFields[formField] = {
          day: this.editForm.value[formField].getDate(),
          month: this.editForm.value[formField].getMonth() + 1
        }
      }

      if (edited && exists && !isDate)
        changedFields[formField] = this.editForm.value[formField];
    });

    let updatedAttachments = this.getUpdatedAttachments();
    if (updatedAttachments)
      changedFields['attachments'] = updatedAttachments;

    return changedFields;
  }

  onActionSuccess(message: string) {
    this.snackBar.open(message, null, { duration: 2000 });
    this.bottomSheetRef.dismiss();
    this.manageService.onDataChange.next();
  }

  onActionError(message: string) {
    let snackBarRef = this.snackBar.open(message, 'RETRY', { duration: 2000 });
    snackBarRef.onAction().subscribe(() => {
      console.log('The snack-bar action was triggered!');
    });
  }

  getValidDates() {
    this.minDateTo = this.editForm.value.dateFrom;
  }

  getAttachmentsArrayOnEdit(attachmentNameRefs: string[]) {
    attachmentNameRefs.map(nameRef => {
      this.attachments.push(new Attachment(null, nameRef, false, false, true))
    })
  }

  getUpdatedAttachments() {
    let updatedAttachmentNameRefs = [];
    this.attachments.map(attachment => {
      if (attachment.shouldDelete || !attachment.inDataStorage)
        updatedAttachmentNameRefs.push(attachment.nameRef);
    })
    return updatedAttachmentNameRefs;
  }

  onFileSubmit(onUploadFile) {
    let newFileObj = onUploadFile.target.files[0];
    this.attachments.push(new Attachment(newFileObj, newFileObj.name, false, false, false));
  }

  onDeleteAttachments() {
    this.attachmentsList.selectedOptions.selected.map((attachment, index) => {
      this.attachments[attachment.value - index].shouldDelete = true;
      // if (this.attachments[attachment.value - index].inDataStorage)
      //   this.manageService.deleteAttachment(this.attachments[attachment.value - index].nameRef);
      // this.attachments.splice(attachment.value - index, 1);
    })
  }

  getAttachmentNameRefs() {
    let attachmentNameRefs = []
    this.attachments.map(attachment => {
      attachmentNameRefs.push(attachment.nameRef);
    })
    return attachmentNameRefs;
  }

  getAttachmentFileObjs() {
    let attachmentFileObjs = [];
    this.attachments.map(attachment => {
      attachmentFileObjs.push(attachment.fileObj);
    })
    return attachmentFileObjs;
  }

}
