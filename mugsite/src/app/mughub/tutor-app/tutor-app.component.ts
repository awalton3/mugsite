import { Component, OnInit, ViewChild, HostListener, AfterViewInit } from '@angular/core';
import { SidenavService } from '../sidenav/sidenav.service';

@Component({
  selector: 'app-tutor-app',
  templateUrl: './tutor-app.component.html',
  styleUrls: ['./tutor-app.component.css']
})

export class TutorAppComponent implements OnInit, AfterViewInit {

  @ViewChild('navDrawer', { static: false }) navDrawer: any;

  @HostListener('window:resize', ['$event'])
  onResize() {
    this.adjustSidenav();
  }

  constructor(private sidenavService: SidenavService) { }

  ngOnInit() {
    console.log('tutor-app init');
    this.sidenavService.onToggle.subscribe(() => this.navDrawer.toggle());
  }

  ngAfterViewInit() {
    this.adjustSidenav();
  }

  adjustSidenav() {
    if (window.innerWidth < 960) {
      this.navDrawer.opened = false;
      this.navDrawer.mode = 'over';
    } else {
      this.navDrawer.opened = true;
      this.navDrawer.mode = 'side';
    }
  }

}
