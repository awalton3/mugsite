import { Component, OnInit, OnDestroy, Output } from '@angular/core';
import { Subscription, Subject } from 'rxjs';
import { HourLogElement } from '../hour-log-element.model';
import { CalendarService } from 'src/app/shared/calendar/calendar.service';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { HourLogUploaderBottomsheetComponent } from './hour-log-uploader-bottomsheet/hour-log-uploader-bottomsheet.component';

@Component({
  selector: 'mughub-hour-log-uploader',
  templateUrl: './hour-log-uploader.component.html',
  styleUrls: ['./hour-log-uploader.component.css']
})

export class HourLogUploaderComponent implements OnInit, OnDestroy {

  private subs = new Subscription();
  @Output() onCloseUploder = new Subject();
  addBtnEnabled: boolean = false;
  dateClicked: { month: string, date: number, hoursLogged: HourLogElement[], dateObj: Date } = {
    month: null,
    date: null,
    hoursLogged: null,
    dateObj: null
  };

  constructor(
    private calendarService: CalendarService,
    private bottomSheet: MatBottomSheet
  ) { }

  ngOnInit() {
    this.subs.add(this.calendarService.onDateClick.subscribe(date => {
      this.dateClicked.month = date.month;
      this.dateClicked.date = date.date;
      this.dateClicked.hoursLogged = date.hoursLogged;
      this.dateClicked.dateObj = date.dateObj;
      this.addBtnEnabled = this.isDateWithinTimeframe(this.dateClicked.dateObj);
    }));
  }

  isDateWithinTimeframe(dateToCheck: Date) {
    const pastDate = new Date();
    pastDate.setDate(pastDate.getDate() - 14);
    pastDate.setHours(0, 0, 0, 0);
    return dateToCheck >= pastDate;
  }

  onAddHours() {
    this.bottomSheet.open(HourLogUploaderBottomsheetComponent, {
      hasBackdrop: false,
      data: {
        isEditMode: false,
        date: this.dateClicked.dateObj
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
