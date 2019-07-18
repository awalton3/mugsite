import { Component, OnInit } from '@angular/core';
import { SidenavService } from '../../sidenav/sidenav.service';

@Component({
  selector: 'mughub-hour-log',
  templateUrl: './hour-log.component.html',
  styleUrls: ['./hour-log.component.css']
})
export class HourLogComponent implements OnInit {

  constructor(private sidenavService: SidenavService) { }
  displayedMonth: { num: number; name: string };
  displayedYear: number;
  numDaysInMonth: number;
  days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

  ngOnInit() {
    let currMonth = new Date().getMonth() + 1
    this.displayedMonth = { num: currMonth, name: this.months[currMonth - 1] };
    this.displayedYear = new Date().getFullYear();
    this.numDaysInMonth = new Date(this.displayedYear, this.displayedMonth.num, 0).getDate()
  }

  getMonthRangeInWeeks() {
    let range = [];
    let numWeeksInMonth = Math.ceil(this.numDaysInMonth / 7);
    for (let i = 1; i <= numWeeksInMonth; i++) {
      range.push(i);
    }
    return range;
  }

  getMonthRangeInDaysPerWeek(startDate: number, endDate: number) {
    let range = [];
    let offset = this.getStartDayInMonth(this.displayedMonth.num, this.displayedYear);

    //update endDate and startDate
    endDate = endDate - offset;
    if (startDate !== 1) startDate = startDate - offset;
    else if(startDate === 1 && offset !== 0){
      let lastDayOfPrevMonth = new Date(this.displayedYear, this.displayedMonth.num, -1).getDate()
      for (let i = 0; i < offset; i++)
        range.push(lastDayOfPrevMonth - i);
    }

    //check if endDate overflows
    if (endDate > this.numDaysInMonth)
      endDate = this.numDaysInMonth;

    //get daysPerWeekRange
    for (let i = startDate; i <= endDate; i++)
      range.push(i);

    //handle underflow at end of month
    let currRangeLength = range.length;

    for (let i = 1; i <= (7 - currRangeLength); i++)
      range.push(i);

    return range;
  }

  getStartDayInMonth(month: number, year: number) {
    return new Date(year, month - 1, 0).getDay() + 1;
  }

  onNextMonth() {
    if (this.checkOverflow('next')) {
      this.displayedYear++;
      this.displayedMonth = { num: 1, name: this.months[0] };
    } else {
      this.displayedMonth.num++;
      this.displayedMonth.name = this.months[this.displayedMonth.num - 1];
    }
  }

  onPrevMonth() {
    if (this.checkOverflow('prev')) {
      this.displayedYear--;
      this.displayedMonth = { num: 12, name: this.months[11] };
    } else {
      this.displayedMonth.num--;
      this.displayedMonth.name = this.months[this.displayedMonth.num - 1];
    }
  }

  checkOverflow(action: string) {
    let currMonth = this.displayedMonth.num;
    if (action === 'next')
      return currMonth + 1 > 12
    else
      return currMonth - 1 < 1;
  }

  closeSidenav() {
    this.sidenavService.onToggle.next();
  }

}
