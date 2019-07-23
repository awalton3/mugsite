import { Component, OnInit, OnDestroy, Output } from '@angular/core';
import { Subscription, Subject } from 'rxjs';
import { HourLogElement } from '../hour-log-element.model';
import { CalendarService } from 'src/app/shared/calendar/calendar.service';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { HourLogUploaderBottomsheetComponent } from './hour-log-uploader-bottomsheet/hour-log-uploader-bottomsheet.component';
import { User } from 'src/app/mughub/auth/user.model';
import { HourLogService } from '../hour-log.service';

@Component({
  selector: 'mughub-hour-log-uploader',
  templateUrl: './hour-log-uploader.component.html',
  styleUrls: ['./hour-log-uploader.component.css']
})

export class HourLogUploaderComponent implements OnInit, OnDestroy {

  private subs = new Subscription();
  addBtnEnabled: boolean = false;
  dateClicked: { month: string, date: number, hoursLogged: HourLogElement[], dateObj: Date } = {
    month: null,
    date: null,
    hoursLogged: null,
    dateObj: null
  };
  @Output() onCloseUploder = new Subject();

  constructor(
    private calendarService: CalendarService,
    private bottomSheet: MatBottomSheet,
    private hourLogService: HourLogService
  ) { }

  ngOnInit() {
    this.subs.add(this.calendarService.onDateClick.subscribe(date => {
      this.dateClicked.month = date.month;
      this.dateClicked.date = date.date;
      this.dateClicked.dateObj = date.dateObj;
      this.dateClicked.hoursLogged = this.hourLogService.loggedHours[this.dateClicked.dateObj.getTime()];
      this.addBtnEnabled = this.hourLogService.isDateWithinTimeframe(this.dateClicked.dateObj);
    }));
    this.subs.add(this.hourLogService.loggedHoursChanged.subscribe(loggedHours => {
      if (this.dateClicked.dateObj)
        this.dateClicked.hoursLogged = loggedHours[this.dateClicked.dateObj.getTime()];
    }))
  }

  onAddHours() {
    const nullConnection = new User(null, null, null, null, null, null, null, null)
    const newHourLogEl = new HourLogElement(null, nullConnection, this.dateClicked.dateObj, "15:00", "16:00")
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

  ngOnDestroy() {
    this.subs.unsubscribe();
  }

}
