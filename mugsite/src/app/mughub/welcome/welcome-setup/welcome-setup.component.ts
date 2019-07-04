import { Component, OnInit, HostListener } from '@angular/core';

@Component({
  selector: 'mughub-welcome-setup',
  templateUrl: './welcome-setup.component.html',
  styleUrls: ['./welcome-setup.component.css']
})
export class WelcomeSetupComponent implements OnInit {

  currStep = { name: 'profile', num: 1 };
  showMobileStepper: boolean = false;
  screenWidth: any;

  @HostListener('window:resize', ['$event'])
  onResize() {
    this.adjustStepper();
  }

  constructor() { }

  ngOnInit() {
    this.screenWidth = window.innerWidth;
    this.adjustStepper();
  }

  adjustStepper() {
    this.screenWidth = window.innerWidth;
    if (this.screenWidth < 430) {
      this.showMobileStepper = true;
    } else {
      this.showMobileStepper = false;
    }
  }
}
