import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { CalendarService } from 'src/app/shared/calendar/calendar.service';
import { Subscription } from 'rxjs';
import { HourLogService } from './hour-log.service';
import { SidenavService } from '../../sidenav/sidenav.service';

@Component({
  selector: 'mughub-hour-log',
  templateUrl: './hour-log.component.html',
  styleUrls: ['./hour-log.component.css']
})
export class HourLogComponent implements OnInit, OnDestroy {

  private subs = new Subscription();
  @ViewChild('editor', { static: false }) editor: MatSidenav;

  constructor(
    private sidenavService: SidenavService,
    private calendarService: CalendarService,
    private hourLogService: HourLogService
  ) { }

  ngOnInit() {
    this.subs.add(this.calendarService.onDateClick.subscribe(() => this.editor.toggle()));
    this.subs.add(this.hourLogService.fetchHoursFromFb()
      .onSnapshot(querySnapshot => {
        this.hourLogService.loggedHours = {};
        querySnapshot.forEach(doc => this.hourLogService.addToLoggedHours(doc.data(), doc.id));
        this.hourLogService.onLoggedHoursChanged();
      }))
  }

  closeSidenav() {
    this.sidenavService.onToggle.next();
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }

}
