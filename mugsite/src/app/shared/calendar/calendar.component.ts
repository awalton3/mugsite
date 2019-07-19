import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent implements OnInit {

  constructor() { }

  displayedMonth: { num: number; name: string };
  displayedYear: number;
  monthRange: any[] = [];
  days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

  ngOnInit() {
    const currMonth = new Date().getMonth() + 1;
    this.displayedMonth = { num: currMonth, name: this.months[currMonth - 1] };
    this.displayedYear = new Date().getFullYear();
    this.getMonthRange(this.displayedYear, this.displayedMonth.num);
  }

  getMonthRange(year: number, month: number) {
    this.monthRange = [];
    const numDaysInMonth = new Date(year, month, 0).getDate();
    const beginOffset = this.getStartDayInMonth(month, year);
    const endOffset = this.getLastDayInMonth(month, year);

    this.getBeginMonthRange(beginOffset);
    this.getMainMonthRange(numDaysInMonth);
    this.getEndMonthRange(endOffset);
  }

  getBeginMonthRange(beginOffset: number) {
    for (let i = 0; i < beginOffset; i++)
      this.monthRange.push(0);
  }

  getMainMonthRange(numDaysInMonth: number) {
    for (let i = 1; i <= numDaysInMonth; i++)
      this.monthRange.push(i);
  }

  getEndMonthRange(endOffset: number) {
    for (let i = 0; i < 6 - endOffset; i++)
      this.monthRange.push(0);
  }

  getStartDayInMonth(month: number, year: number) {
    return new Date(year, month - 1, 1).getDay();
  }

  getLastDayInMonth(month: number, year: number) {
    return new Date(year, month, 0).getDay();
  }

  // getMonthRangeInWeeks() {
  //   let range = [];
  //   let numWeeksInMonth = Math.ceil(this.numDaysInMonth / 7);
  //   for (let i = 1; i <= numWeeksInMonth; i++)
  //     range.push(i);
  //   return range;
  // }
  //
  // getMonthRangeInDaysPerWeek(startDate: number, endDate: number) {
  //   let range = [];
  //   let offset = this.getStartDayInMonth(this.displayedMonth.num, this.displayedYear);
  //
  //   //update endDate and startDate
  //   endDate = endDate - offset;
  //   if (startDate !== 1) startDate = startDate - offset;
  //   else if (startDate === 1 && offset !== 0) {
  //     let lastDateOfPrevMonth = this.getLastDayOfPrevMonth(this.displayedYear, this.displayedMonth.num);
  //     for (let i = offset; i >= 1; i--) {
  //       range.push(lastDateOfPrevMonth - i + 1);
  //     }
  //   }
  //
  //   //check if endDate overflows
  //   if (endDate > this.numDaysInMonth)
  //     endDate = this.numDaysInMonth;
  //
  //   //get daysPerWeekRange
  //   for (let i = startDate; i <= endDate; i++)
  //     range.push(i);
  //
  //   //handle underflow at end of month
  //   let currRangeLength = range.length;
  //   for (let i = 1; i <= (7 - currRangeLength); i++)
  //     range.push(i);
  //
  //   return range;
  // }
  //
  // getLastDayOfPrevMonth(year: number, month: number) {
  //   return new Date(year, month - 1, 0).getDate();
  // }
  //
  // onNextMonth() {
  //   if (this.checkOverflow('next')) {
  //     this.displayedYear++;
  //     this.displayedMonth = { num: 1, name: this.months[0] };
  //   } else {
  //     this.displayedMonth.num++;
  //     this.displayedMonth.name = this.months[this.displayedMonth.num - 1];
  //   }
  //   this.numDaysInMonth = new Date(this.displayedYear, this.displayedMonth.num, 0).getDate()
  // }
  //
  // onPrevMonth() {
  //   if (this.checkOverflow('prev')) {
  //     this.displayedYear--;
  //     this.displayedMonth = { num: 12, name: this.months[11] };
  //   } else {
  //     this.displayedMonth.num--;
  //     this.displayedMonth.name = this.months[this.displayedMonth.num - 1];
  //   }
  //   this.numDaysInMonth = new Date(this.displayedYear, this.displayedMonth.num, 0).getDate()
  // }
  //
  // checkOverflow(action: string) {
  //   let currMonth = this.displayedMonth.num;
  //   if (action === 'next')
  //     return currMonth + 1 > 12
  //   else
  //     return currMonth - 1 < 1;
  // }

}
