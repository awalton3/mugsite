import { Component, OnInit, HostListener, Input, OnDestroy } from '@angular/core';
import { StepperService } from './stepper.service';

@Component({
  selector: 'app-stepper',
  templateUrl: './stepper.component.html',
  styleUrls: ['./stepper.component.css']
})
export class StepperComponent implements OnInit, OnDestroy {

  @Input() steps: string[];

  currStep = { name: 'profile', num: 0 };
  showMobileStepper: boolean = false;

  @HostListener('window:resize', ['$event'])
  onResize() {
    this.adjustStepper(window.innerWidth);
  }

  constructor(private stepperService: StepperService) { }

  ngOnInit() {
    this.adjustStepper(window.innerWidth);
    this.stepperService.onChangeStep.subscribe(newCurrStep => {
      this.currStep = newCurrStep;
    });
  }

  adjustStepper(width) {
    if (width < 500) {
      this.showMobileStepper = true;
    } else {
      this.showMobileStepper = false;
    }
  }

  ngOnDestroy() {
    this.stepperService.onChangeStep.unsubscribe();
  }

}
