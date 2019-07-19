import { Component, OnInit, ViewChild } from '@angular/core';
import { SidenavService } from '../../sidenav/sidenav.service';
import { MatSidenav } from '@angular/material/sidenav';

@Component({
  selector: 'mughub-hour-log',
  templateUrl: './hour-log.component.html',
  styleUrls: ['./hour-log.component.css']
})
export class HourLogComponent implements OnInit {

  dateToLog: Date;
  @ViewChild('editor', { static: false }) editor: MatSidenav

  constructor(private sidenavService: SidenavService) { }

  ngOnInit() {
  }

  onLog(dateToLog: Date) {
    this.dateToLog = dateToLog;
    this.editor.toggle();
  }

  closeSidenav() {
    this.sidenavService.onToggle.next();
  }

}
