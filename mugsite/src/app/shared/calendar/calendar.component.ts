import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { CalendarService } from './calendar.service';
import { HourLogElement } from 'src/app/mughub/tutor-app/hour-log/hour-log-element.model';
import { Subject, Subscription } from 'rxjs';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent implements OnInit, OnDestroy {

  constructor(private calendarService: CalendarService) { }

  @Input() loggedHoursSub? = new Subject<{ [key: number]: HourLogElement[] }>();

  private subs = new Subscription();
  displayedMonth: { num: number; name: string };
  displayedYear: number;
  monthRange: { date: any, enabled: boolean, hasEvent: boolean }[] = [];
  days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  loggedHours: { [key: number]: HourLogElement[] } = {};

  ngOnInit() {
    const currDate = new Date();
    this.updateDisplayData(currDate.getFullYear(), currDate.getMonth() + 1)
    this.subs.add(this.loggedHoursSub.subscribe(loggedHours => {
      this.loggedHours = loggedHours;
      this.updateDisplayData(this.displayedYear, this.displayedMonth.num);
    }))
  }

  updateDisplayData(year: number, month: number) {
    this.displayedYear = year;
    this.displayedMonth = { num: month, name: this.months[month - 1] };
    this.monthRange = this.calendarService.getMonthRange(this.displayedYear, this.displayedMonth.num);
  }

  onNextMonth() {
    const nextMonth = new Date(this.displayedYear, this.displayedMonth.num, 1);
    this.updateDisplayData(nextMonth.getFullYear(), nextMonth.getMonth() + 1);
  }

  onPrevMonth() {
    const prevMonth = new Date(this.displayedYear, this.displayedMonth.num - 1, 0);
    this.updateDisplayData(prevMonth.getFullYear(), prevMonth.getMonth() + 1);
  }

  onDateClicked(dateEl: { date: number, enabled: boolean }) {
    if (dateEl.enabled) {
      const dateClicked = new Date(this.displayedYear, this.displayedMonth.num - 1, dateEl.date);
      this.calendarService.onDateClick.next({
        dateObj: dateClicked,
        month: this.months[this.displayedMonth.num - 1],
        date: dateEl.date
      });
    }
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }
}
