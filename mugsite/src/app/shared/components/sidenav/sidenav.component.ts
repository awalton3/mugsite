import { Component, OnInit, Output, EventEmitter, HostListener } from '@angular/core';

@Component({
  selector: 'mughub-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css']
})

export class SidenavComponent implements OnInit {

  @Output() navDest = new EventEmitter<string>();
  @Output() closeNav = new EventEmitter();

  screenWidth: any;

  @HostListener('window:resize', ['$event'])
  onResize() {
    this.screenWidth = window.innerWidth;
  }

  constructor() { }

  ngOnInit() {
  }

  onNav(destination: string) {
    this.navDest.emit(destination);
  }

  onClose() {
    this.closeNav.emit();
  }

}
