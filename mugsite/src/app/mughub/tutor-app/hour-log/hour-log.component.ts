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

  closeSidenav() {
    this.sidenavService.onToggle.next();
  }

  numDaysInMonthRange(month, year) {
    let rangeMax = new Date(year, month, 0).getDate();
    let range = [];
    for (let i = 1; i <= rangeMax; i++) {
      range.push(i);
    }
    return range;
  }

  getMonthWeeksRange() {
    let range = [];
    for (let i = 1; i <= this.numDaysInMonth; i++)
      range.push(i);
    return range;
  }

  getMonthRowRange(currIndex: number) {
    if (currIndex === 1) {
      
    }
    let range = [];
    for (let i = currIndex; i < currIndex + 7; i++) {
      range.push(i);
    }
    return range;
  }
  //sun, mon, tues, weds, thurs, fri, sat
  //1, 2, 3, 4, 5, 6, 7
  //8, 9, 10, 11, 12, 13, 14

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

}
