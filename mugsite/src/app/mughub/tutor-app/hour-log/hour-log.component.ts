import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { CalendarService } from 'src/app/shared/calendar/calendar.service';
import { Subscription } from 'rxjs';
import { HourLogService } from './hour-log.service';
import { SidenavService } from '../../sidenav/sidenav.service';
import { HourLogElement } from './hour-log-element.model';
import { QuerySnapshot } from '@angular/fire/firestore';

@Component({
  selector: 'mughub-hour-log',
  templateUrl: './hour-log.component.html',
  styleUrls: ['./hour-log.component.css']
})
export class HourLogComponent implements OnInit, OnDestroy {

  private subs = new Subscription();
  dateClicked: { month: string, date: number, hoursLogged: HourLogElement[], dateObj: Date };
  canAddHours: boolean;
  @ViewChild('editor', { static: false }) editor: MatSidenav;

  constructor(
    private sidenavService: SidenavService,
    private calendarService: CalendarService,
    private hourLogService: HourLogService
  ) { }

  ngOnInit() {
    this.listenToCalendarClickEvents();
    this.listenToLoggedHoursChanges();
  }

  listenToCalendarClickEvents() {
    this.subs.add(this.calendarService.onDateClick.subscribe(date => {
      this.onCalendarClickEvent(date);
    }));
  }

  onCalendarClickEvent(date: { dateObj: Date, month: string, date: number }) {
    this.editor.toggle();
    this.dateClicked = {
      month: date.month,
      date: date.date,
      dateObj: date.dateObj,
      hoursLogged: this.hourLogService.loggedHours[date.dateObj.getTime()]
    }
    this.canAddHours = this.hourLogService.isDateWithinTimeframe(this.dateClicked.dateObj);
  }

  listenToLoggedHoursChanges() {
    this.subs.add(this.hourLogService.fetchHoursFromFb()
      .onSnapshot(querySnapshot => {
        this.onLoggedHoursChanged(querySnapshot);
      }))
  }

  onLoggedHoursChanged(querySnapshot: QuerySnapshot<any>) {
    this.hourLogService.loggedHours = {};
    querySnapshot.forEach(doc => this.hourLogService.addToLoggedHours(doc.data(), doc.id));
    // this.hourLogService.onLoggedHoursChanged();
    if (this.dateClicked)
      this.dateClicked.hoursLogged = this.hourLogService.loggedHours[this.dateClicked.dateObj.getTime()];
  }

  closeSidenav() {
    this.sidenavService.onToggle.next();
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }

}
