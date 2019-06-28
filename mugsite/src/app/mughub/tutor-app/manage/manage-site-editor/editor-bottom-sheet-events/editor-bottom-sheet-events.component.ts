import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { MatBottomSheetRef, MAT_BOTTOM_SHEET_DATA } from '@angular/material/bottom-sheet';
import { FormGroup, FormControl } from '@angular/forms';
import { MatSelectionList } from '@angular/material/list';
import { ManageService } from '../../manage.service';

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
  minDateFrom = new Date();
  minDateTo = new Date();

  @ViewChild('attachmentsList', {static: false}) attachmentsList: MatSelectionList;
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
      'title': new FormControl(null),
      'description': new FormControl(null),
      'dateFrom': new FormControl(null),
      'dateTo': new FormControl(null),
      'location': new FormControl(null),
      'time': new FormControl(null),
      'contact': new FormControl(null),
      'instructions': new FormControl(null),
      'attachments': new FormControl(null)
    })
  }

  private initFormWithValues() {
    let eventData = this.data.dataToEdit;

    this.editForm = new FormGroup({
      'title': new FormControl(eventData.title),
      'description': new FormControl(eventData.description),
      'dateFrom': new FormControl(new Date(eventData.dateFrom.year, eventData.dateFrom.month, eventData.dateFrom.day)),
      'dateTo': new FormControl(new Date(eventData.dateTo.year, eventData.dateTo.month, eventData.dateTo.day)),
      'location': new FormControl(eventData.location),
      'time': new FormControl(eventData.time),
      'contact': new FormControl(eventData.contact),
      'instructions': new FormControl(eventData.instructions),
      'attachments': new FormControl(eventData.attachments)
    })
  }

  onCancel() {
    if (confirm("Performing this action will lose all changes that have been made. Are you sure, you want to cancel?"))
      this.bottomSheetRef.dismiss();
  }

  onSubmit() {
    this.manageService.addNewEvent(this.editForm.value);
  }

  onDelete() {

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

}
