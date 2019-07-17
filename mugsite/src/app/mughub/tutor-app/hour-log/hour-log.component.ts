import { Component, OnInit } from '@angular/core';
import { SidenavService } from '../../sidenav/sidenav.service';

@Component({
  selector: 'mughub-hour-log',
  templateUrl: './hour-log.component.html',
  styleUrls: ['./hour-log.component.css']
})
export class HourLogComponent implements OnInit {

  constructor(private sidenavService: SidenavService) { }
  days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  ngOnInit() {
    console.log(this.getNumDaysInMonth(3, 2019));
    console.log(this.getStartDayInMonth(1, 2019));
  }

  closeSidenav() {
    this.sidenavService.onToggle.next();
  }

  getNumDaysInMonth(month, year) {
    return new Date(year, month, 0).getDate();
  }

  getStartDayInMonth(month, year) {
    return new Date(year, month - 1, 0).getDay() + 1;
  }


}
