import { Component, OnInit, Output, HostListener } from '@angular/core';
import { Subject } from 'rxjs';

@Component({
  selector: 'mughub-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css']
})

export class SidenavComponent implements OnInit {

  @Output() navDest = new Subject<string>();
  @Output() closeNav = new Subject();

  screenWidth: any;

  @HostListener('window:resize', ['$event'])
  onResize() {
    this.screenWidth = window.innerWidth;
  }

  constructor() { }

  ngOnInit() {
  }

  onNav(destination: string) {
    this.navDest.next(destination);
  }

  onClose() {
    this.closeNav.next();
  }

}
