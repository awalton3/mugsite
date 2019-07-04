import { Component, OnInit, HostListener, Input } from '@angular/core';

@Component({
  selector: 'app-stepper',
  templateUrl: './stepper.component.html',
  styleUrls: ['./stepper.component.css']
})
export class StepperComponent implements OnInit {

  @Input() steps: string[];

  currStep = { name: 'profile', num: 0 };
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
    if (this.screenWidth < 440) {
      this.showMobileStepper = true;
    } else {
      this.showMobileStepper = false;
    }
  }

}
