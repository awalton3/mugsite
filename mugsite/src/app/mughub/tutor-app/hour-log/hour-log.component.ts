import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { SidenavService } from '../../sidenav/sidenav.service';
import { MatSidenav } from '@angular/material/sidenav';
import { CalendarService } from 'src/app/shared/calendar/calendar.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'mughub-hour-log',
  templateUrl: './hour-log.component.html',
  styleUrls: ['./hour-log.component.css']
})
export class HourLogComponent implements OnInit, OnDestroy {

  private subs = new Subscription();
  @ViewChild('editor', { static: false }) editor: MatSidenav

  constructor(
    private sidenavService: SidenavService,
    private calendarService: CalendarService
  ) { }

  ngOnInit() {
    this.subs.add(this.calendarService.onDateClick.subscribe(() => this.editor.toggle()));
  }

  closeSidenav() {
    this.sidenavService.onToggle.next();
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }

}
