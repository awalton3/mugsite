import { Component, OnInit, Inject } from '@angular/core';
import { MatBottomSheetRef } from '@angular/material/bottom-sheet';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-hour-log-automate-bottom-sheet',
  templateUrl: './hour-log-automate-bottom-sheet.component.html',
  styleUrls: ['./hour-log-automate-bottom-sheet.component.css']
})
export class HourLogAutomateBottomSheetComponent implements OnInit {

  timeframeForm = new FormGroup({});
  days = ['Sun', 'M', 'Tu', 'W', 'Th', 'F', 'Sat']
  daysSelected: string[] = [];

  constructor(
    private bottomSheetRef: MatBottomSheetRef<HourLogAutomateBottomSheetComponent>,
    // @Inject(MAT_BOTTOM_SHEET_DATA) public data: any,
  ) { }

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.timeframeForm = new FormGroup({
      timeframe: new FormControl(null, Validators.required)
    })
  }

  onDaySelect(day: string) {
    if (this.daysSelected.includes(day)) {
      let indexToDelete = this.daysSelected.indexOf(day);
      this.daysSelected.splice(indexToDelete,1);
    }
    else
      this.daysSelected.push(day);
  }

}
