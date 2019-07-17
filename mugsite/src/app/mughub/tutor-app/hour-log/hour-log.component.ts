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
  days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

  ngOnInit() {
    this.displayedMonth = {
      num: new Date().getMonth() + 1,
      name: this.months[new Date().getMonth()]
    }
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

  getStartDayInMonth(month, year) {
    return new Date(year, month - 1, 0).getDay() + 1;
  }

  onNextMonth() {
    this.displayedMonth.num++;
    this.displayedMonth.name = this.months[this.displayedMonth.num - 1];
  }

  onPrevMonth() {
    this.displayedMonth.num--; 
    this.displayedMonth.name = this.months[this.displayedMonth.num - 1];
  }

}
