import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { HourLogService } from 'src/app/mughub/tutor-app/hour-log/hour-log.service';

@Injectable()

export class CalendarService {

  constructor(private hourLogService: HourLogService) {}

  onDateClick = new Subject<{ dateObj: Date, month: string, date: number }>();
  days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  monthRange: { date: any, enabled: boolean, hasEvent: boolean, isToday: boolean }[] = [];

  getMonthRange(year: number, month: number) {
    this.monthRange = [];
    const numDaysInMonth = new Date(year, month, 0).getDate();
    const beginOffset = this.getStartDayInMonth(year, month);
    const endOffset = this.getLastDayInMonth(year, month);

    this.getBeginMonthRange(beginOffset, year, month);
    this.getMainMonthRange(numDaysInMonth, year, month);
    this.getEndMonthRange(endOffset, year, month);
    
    return this.monthRange;
  }

  getBeginMonthRange(beginOffset: number, year: number, month: number) {
    const lastDayOfPrevMonth = this.getLastDayOfPrevMonth(year, month);
    for (let i = beginOffset; i >= 1; i--) {
      this.monthRange.push({
        date: lastDayOfPrevMonth - i + 1,
        enabled: false,
        hasEvent: this.ifDateHasEvent(i, year, month),
        isToday: this.ifDateIsToday(i, year, month)
      });
    }
  }

  getMainMonthRange(numDaysInMonth: number, year: number, month: number) {
    for (let i = 1; i <= numDaysInMonth; i++) {
      this.monthRange.push({
        date: i,
        enabled: true,
        hasEvent: this.ifDateHasEvent(i, year, month),
        isToday: this.ifDateIsToday(i, year, month)
      });
    }
  }

  getEndMonthRange(endOffset: number, year: number, month: number) {
    for (let i = 1; i <= 6 - endOffset; i++)
      this.monthRange.push({
        date: i,
        enabled: false,
        hasEvent: this.ifDateHasEvent(i, year, month),
        isToday: this.ifDateIsToday(i, year, month)
      });
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

  ifDateHasEvent(date: number, year: number, month: number) {
    const dateToCheck = new Date(year, month - 1, date);
    return !!(this.hourLogService.loggedHours[dateToCheck.getTime()]);
  }

  ifDateIsToday(date: number, year: number, month: number) {
    const dateToCheck = new Date(year, month - 1, date);
    const currDate = new Date();
    currDate.setHours(0, 0, 0, 0);
    return currDate.getTime() === dateToCheck.getTime();
  }

}
