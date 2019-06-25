import { Component, OnInit, OnDestroy, ViewChild, HostListener } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-tutor-app',
  templateUrl: './tutor-app.component.html',
  styleUrls: ['./tutor-app.component.css']
})
export class TutorAppComponent implements OnInit, OnDestroy {

  @ViewChild('navDrawer', { static: false }) navDrawer: any;
  openDrawerByDef: boolean;
  drawerMode: string;

  @HostListener('window:resize', ['$event'])
  onResize() {
    if(window.innerWidth <  960) {
      this.navDrawer.opened = false;
      this.navDrawer.mode = 'over';
    } else {
      this.navDrawer.opened = true;
      this.navDrawer.mode = 'side';
    }
  }

  constructor() {}

  ngOnInit() {
  }

  ngOnDestroy() {
  }

}
