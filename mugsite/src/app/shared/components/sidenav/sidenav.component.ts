import { Component, OnInit, ViewChild, HostListener } from '@angular/core';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css']
})
export class SidenavComponent implements OnInit {

  @ViewChild('navDrawer', { static: false }) navDrawer: any;
  openDrawerByDef: boolean;
  drawerMode: string;
  navDestTitle: string;
  screenWidth: any; 

  @HostListener('window:resize', ['$event'])
  onResize() {
    this.screenWidth = window.innerWidth;
    if(window.innerWidth <  960) {
      this.navDrawer.opened = false;
      this.navDrawer.mode = 'over';
    } else {
      this.navDrawer.opened = true;
      this.navDrawer.mode = 'side';
    }
  }

  constructor() { }

  ngOnInit() {
  }

  onNav(destination: string) {
    this.navDestTitle = destination;
  }

}
