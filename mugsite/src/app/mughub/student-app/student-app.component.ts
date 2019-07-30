import { Component, OnInit, ViewChild, HostListener, AfterViewInit, OnDestroy } from '@angular/core';
import { SidenavService } from '../sidenav/sidenav.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-student-app',
  templateUrl: './student-app.component.html',
  styleUrls: ['./student-app.component.css']
})
export class StudentAppComponent implements OnInit, AfterViewInit, OnDestroy {

  private subs = new Subscription()
  @ViewChild('sidenav', { static: false }) sidenav: any;
  @HostListener('window:resize', ['$event'])
  onResize() {
    this.adjustSidenav();
  }

  constructor(private sidenavService: SidenavService) { }

  ngOnInit() {
    this.listenForSidenavToggle();
  }

  ngAfterViewInit() {
    this.adjustSidenav();
  }

  listenForSidenavToggle() {
    this.subs.add(this.sidenavService.onToggle.subscribe(() => this.sidenav.toggle()))
  }

  adjustSidenav() {
    if (window.innerWidth < 960) {
      this.sidenav.opened = false;
      this.sidenav.mode = 'over';
    } else {
      this.sidenav.opened = true;
      this.sidenav.mode = 'side';
    }
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }

}
