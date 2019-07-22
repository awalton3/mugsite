import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { SidenavService } from '../../sidenav/sidenav.service';
import { MatSidenav } from '@angular/material/sidenav';
import { CalendarService } from 'src/app/shared/calendar/calendar.service';
import { Subscription } from 'rxjs';
import { HourLogService } from './hour-log.service';

@Component({
  selector: 'mughub-hour-log',
  templateUrl: './hour-log.component.html',
  styleUrls: ['./hour-log.component.css']
})
export class HourLogComponent implements OnInit, OnDestroy {

  private subs = new Subscription();
  loggedHours = [];
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
        this.loggedHours = [];
        querySnapshot.forEach(doc => this.loggedHours.push(doc.data()))
      }))
  }

  closeSidenav() {
    this.sidenavService.onToggle.next();
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }

}
