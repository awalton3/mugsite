import { Component, OnInit, Output } from '@angular/core';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent implements OnInit {

  constructor() { }

  displayedMonth: { num: number; name: string };
  displayedYear: number;
  monthRange: { date: any, enabled: boolean }[] = [];
  days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

  @Output() onDateClick = new Subject<Date>();

  ngOnInit() {
    const currDate = new Date();
    this.updateDisplayData(currDate.getFullYear(), currDate.getMonth() + 1)
    this.getMonthRange(this.displayedYear, this.displayedMonth.num);
  }

  updateDisplayData(year, month) {
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

  onDateClicked(date: number) {
    const dateClicked = new Date(this.displayedYear, this.displayedMonth.num - 1, date);
    this.onDateClick.next(dateClicked);
  }

}
