import { Component, OnInit, Inject } from '@angular/core';
import { MatBottomSheetRef } from '@angular/material/bottom-sheet';

@Component({
  selector: 'app-hour-log-automate-bottom-sheet',
  templateUrl: './hour-log-automate-bottom-sheet.component.html',
  styleUrls: ['./hour-log-automate-bottom-sheet.component.css']
})
export class HourLogAutomateBottomSheetComponent implements OnInit {

  constructor(
    private bottomSheetRef: MatBottomSheetRef<HourLogAutomateBottomSheetComponent>,
    // @Inject(MAT_BOTTOM_SHEET_DATA) public data: any,
  ) { }

  ngOnInit() {
  }

}
