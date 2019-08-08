import { Component, OnInit, Output, Input } from '@angular/core';
import { Subject, Subscription } from 'rxjs';
import { HourLogElement } from '../hour-log-element.model';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { HourLogUploaderBottomsheetComponent } from './hour-log-uploader-bottomsheet/hour-log-uploader-bottomsheet.component';
import { HourLogService } from '../hour-log.service';
import { QuerySnapshot } from '@angular/fire/firestore';

@Component({
  selector: 'mughub-hour-log-uploader',
  templateUrl: './hour-log-uploader.component.html',
  styleUrls: ['./hour-log-uploader.component.css']
})

export class HourLogUploaderComponent implements OnInit {

  private subs = new Subscription();
  @Input() addBtnEnabled: boolean = false;
  @Input() dateClicked: { month: string, date: number, hoursLogged: HourLogElement[], dateObj: Date };
  @Output() onCloseUploder = new Subject();

  constructor(private bottomSheet: MatBottomSheet, private hourLogService: HourLogService) { }

  ngOnInit() {
    this.listenToLoggedHoursChanges()
  }

  listenToLoggedHoursChanges() {
    this.subs.add(this.hourLogService.fetchHoursFromFb()
      .onSnapshot(() => {
        this.onLoggedHoursChanged();
      }))
  }

  onLoggedHoursChanged() {
    if (this.dateClicked)
      this.dateClicked.hoursLogged = this.hourLogService.loggedHours[this.dateClicked.dateObj.getTime()];
  }

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
