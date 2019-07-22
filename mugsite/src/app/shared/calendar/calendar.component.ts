import { Component, OnInit, Input } from '@angular/core';
import { CalendarService } from './calendar.service';
import { User } from 'firebase';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent implements OnInit {

  constructor(private calendarService: CalendarService) { }

  @Input() loggedHours?: { connection: User, date: Date, startTime: string, endTime: string }[] = [];
  
  displayedMonth: { num: number; name: string };
  displayedYear: number;
  monthRange: { date: any, enabled: boolean }[] = [];
  days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

  ngOnInit() {
    const currDate = new Date();
    this.updateDisplayData(currDate.getFullYear(), currDate.getMonth() + 1)
    this.getMonthRange(this.displayedYear, this.displayedMonth.num);
  }

  updateDisplayData(year: number, month: number) {
    this.displayedYear = year;
    this.displayedMonth = { num: month, name: this.months[month - 1] };
    this.getMonthRange(this.displayedYear, this.displayedMonth.num);
  }

  getMonthRange(year: number, month: number) {
    this.monthRange = [];
    const numDaysInMonth = new Date(year, month, 0).getDate();
    const beginOffset = this.getStartDayInMonth(year, month);
    const endOffset = this.getLastDayInMonth(year, month);

    this.getBeginMonthRange(beginOffset, year, month);
    this.getMainMonthRange(numDaysInMonth, year, month);
    this.getEndMonthRange(endOffset);
  }

  getBeginMonthRange(beginOffset: number, year: number, month: number) {
    const lastDayOfPrevMonth = this.getLastDayOfPrevMonth(year, month);
    for (let i = beginOffset; i >= 1; i--) {
      this.monthRange.push({ date: lastDayOfPrevMonth - i + 1, enabled: false });
    }
  }

  getMainMonthRange(numDaysInMonth: number, year: number, month: number) {
    for (let i = 1; i <= numDaysInMonth; i++) {
      this.monthRange.push({ date: i, enabled: this.ifDateValidToClick(i, year, month) });
    }
  }

  ifDateValidToClick(date: number, year: number, month: number) {
    const dateToCheck = new Date(year, month - 1, date);
    const currDate = new Date();
    currDate.setHours(0, 0, 0, 0);
    return dateToCheck >= currDate;
  }

  getEndMonthRange(endOffset: number) {
    for (let i = 1; i <= 6 - endOffset; i++)
      this.monthRange.push({ date: i, enabled: false });
  }

  getStartDayInMonth(year: number, month: number) {
    return new Date(year, month - 1, 1).getDay();
  }

  getLastDayInMonth(year: number, month: number) {
    return new Date(year, month, 0).getDay();
  }

  getLastDayOfPrevMonth(year: number, month: number) {
    return new Date(year, month - 1, 0).getDate();
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
      this.calendarService.onDateClick.next(dateClicked);
    }
  }
}
