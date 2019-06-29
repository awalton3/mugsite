import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { MatBottomSheetRef, MAT_BOTTOM_SHEET_DATA } from '@angular/material/bottom-sheet';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatSelectionList } from '@angular/material/list';
import { ManageService } from '../../manage.service';
import { MatRadioGroup } from '@angular/material/radio';

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
  minDateTo: Date; //always same or date after the picked dateFrom

  @ViewChild('dateOption', { static: false }) dateOption: MatRadioGroup;
  @ViewChild('attachmentsList', { static: false }) attachmentsList: MatSelectionList;
  attachments: File[] = [];

  constructor(
    private bottomSheetRef: MatBottomSheetRef<EditorBottomSheetEventsComponent>,
    @Inject(MAT_BOTTOM_SHEET_DATA) public data: any,
    private manageService: ManageService
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
    if (this.editForm.valid) {
      this.manageService.addNewEvent(this.editForm.value)
        .then(() => {
          alert('Your event was successfully published.');
          this.bottomSheetRef.dismiss();
        })
        .catch(error => console.log(error));
    }
  }

  onDelete() {
    if (confirm("This action will permanently delete the event from the website.")) {
      this.manageService.deleteEvent(this.data.docId)
        .then(() => {
          alert('The event was successfully deleted.')
          this.bottomSheetRef.dismiss();
        })
        .catch(error => console.log(error))
    }
  }

  onFileSubmit(event) {
    this.attachments.push(event.target.files[0]);
    document.getElementById('option').scrollIntoView(true);
  }

  onDeleteAttachment() {
    this.attachmentsList.selectedOptions.selected.map((attachment, index) => {
      this.attachments.splice(attachment.value - index, 1);
    })
  }

  getValidDates() {
    this.minDateTo = this.editForm.value.dateFrom;
  }

}
