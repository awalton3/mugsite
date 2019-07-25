import { Component, OnInit, Output, Input } from '@angular/core';
import { Subject } from 'rxjs';
import { HourLogElement } from '../hour-log-element.model';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { HourLogUploaderBottomsheetComponent } from './hour-log-uploader-bottomsheet/hour-log-uploader-bottomsheet.component';

@Component({
  selector: 'mughub-hour-log-uploader',
  templateUrl: './hour-log-uploader.component.html',
  styleUrls: ['./hour-log-uploader.component.css']
})

export class HourLogUploaderComponent implements OnInit {

  @Input() addBtnEnabled: boolean = false;
  @Input() dateClicked: { month: string, date: number, hoursLogged: HourLogElement[], dateObj: Date };
  @Output() onCloseUploder = new Subject();

  constructor(private bottomSheet: MatBottomSheet) { }

  ngOnInit() {}

  onAddHours() {
    const newHourLogEl = new HourLogElement(null, [], this.dateClicked.dateObj, "15:00", "16:00")
    this.bottomSheet.open(HourLogUploaderBottomsheetComponent, {
      hasBackdrop: false,
      data: {
        isEditMode: false,
        hourLogEl: newHourLogEl
      }
    });
  }

  onEditHourLogEl(hourLogEl: HourLogElement) {
    this.bottomSheet.open(HourLogUploaderBottomsheetComponent, {
      hasBackdrop: false,
      data: {
        isEditMode: true,
        hourLogEl: hourLogEl
      }
    });
  }

  onClose() {
    this.onCloseUploder.next();
  }

}
