import { Component, OnInit, OnDestroy, ViewChild, HostListener } from '@angular/core';

@Component({
  selector: 'app-tutor-app',
  templateUrl: './tutor-app.component.html',
  styleUrls: ['./tutor-app.component.css']
})

export class TutorAppComponent implements OnInit, OnDestroy {

  navDest: string = 'MANAGE';

  @ViewChild('navDrawer', { static: false }) navDrawer: any;

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

  getNavDest(navDest: string) {
    this.navDest = navDest;
  }

}
