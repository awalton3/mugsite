import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { SidenavService } from '../../sidenav/sidenav.service';
import { MatSidenav } from '@angular/material/sidenav';
import { CalendarService } from 'src/app/shared/calendar/calendar.service';
import { Subscription, Subject } from 'rxjs';
import { HourLogService } from './hour-log.service';
import { HourLogElement } from './hour-log-element.model';

@Component({
  selector: 'mughub-hour-log',
  templateUrl: './hour-log.component.html',
  styleUrls: ['./hour-log.component.css']
})
export class HourLogComponent implements OnInit, OnDestroy {

  private subs = new Subscription();
  loggedHoursSub = new Subject<{ [key: number]: HourLogElement[] }>();
  loggedHours: { [key: number]: HourLogElement[] } = {};
  @ViewChild('editor', { static: false }) editor: MatSidenav

  constructor(
    private sidenavService: SidenavService,
    private calendarService: CalendarService,
    private hourLogService: HourLogService
  ) { }

  ngOnInit() {
    this.subs.add(this.calendarService.onDateClick.subscribe(() => this.editor.toggle()));
    this.subs.add(this.hourLogService.fetchHoursFromFb()
      .onSnapshot(querySnapshot => {
        this.loggedHours = {};
        querySnapshot.forEach(doc => this.updateLoggedHoursObj(doc.data()));
        this.loggedHoursSub.next(this.loggedHours);
      }))
  }

  updateLoggedHoursObj(logElData) {
    const hourLogElement = this.getLogEl(logElData);
    const dateInMiliSecs = hourLogElement.date.getTime();
    if (this.loggedHours[dateInMiliSecs]) {
      this.loggedHours[dateInMiliSecs].push(hourLogElement);
    } else {
      this.loggedHours[dateInMiliSecs] = [];
      this.loggedHours[dateInMiliSecs].push(hourLogElement);
    }
  }

  getLogEl(logElData) {
    let date = logElData.date.toDate(); //convert firebase timestamp to Date obj
    date.setHours(0, 0, 0, 0);
    return {
      connection: logElData.connection,
      date: date,
      startTime: logElData.startTime,
      endTime: logElData.endTime,
    }
  }

  closeSidenav() {
    this.sidenavService.onToggle.next();
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }

}
