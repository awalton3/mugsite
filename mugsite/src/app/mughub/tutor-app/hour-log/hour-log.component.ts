import { Component, OnInit } from '@angular/core';
import { SidenavService } from '../../sidenav/sidenav.service';

@Component({
  selector: 'mughub-hour-log',
  templateUrl: './hour-log.component.html',
  styleUrls: ['./hour-log.component.css']
})
export class HourLogComponent implements OnInit {

  constructor(private sidenavService: SidenavService) { }

  ngOnInit() {
  }

  onLog(dateToLog: Date) {
    console.log(dateToLog);
  }

  closeSidenav() {
    this.sidenavService.onToggle.next();
  }

}
