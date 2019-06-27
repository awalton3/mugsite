import { Component, OnInit, Inject } from '@angular/core';
import { MatBottomSheetRef, MAT_BOTTOM_SHEET_DATA } from '@angular/material/bottom-sheet';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'editor-bottom-sheet-events',
  templateUrl: './editor-bottom-sheet-events.component.html',
  styleUrls: ['./editor-bottom-sheet-events.component.css']
})

export class EditorBottomSheetEventsComponent implements OnInit {

  editForm: FormGroup;

  constructor(
    private bottomSheetRef: MatBottomSheetRef<EditorBottomSheetEventsComponent>,
    @Inject(MAT_BOTTOM_SHEET_DATA) public data: any
  ) { }

  ngOnInit() {
    console.log(this.data.eventToEdit);
    this.initForm();
  }

  private initForm() {
    let eventData = this.data.eventToEdit;

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
    this.bottomSheetRef.dismiss();
  }

  onSubmit() {
    //...
  }

}
