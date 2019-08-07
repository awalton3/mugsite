import { Component, OnInit } from '@angular/core';
import { StepperService } from 'src/app/shared/stepper/stepper.service';
import { Router } from '@angular/router';

@Component({
  selector: 'mughub-welcome-setup-settings',
  templateUrl: './welcome-setup-settings.component.html',
  styleUrls: ['./welcome-setup-settings.component.css']
})
export class WelcomeSetupSettingsComponent implements OnInit {

  constructor(
    private stepperService: StepperService,
    private router: Router
  ) { }

  ngOnInit() {
  }

  onSettingsSubmit() {
    this.stepperService.onChangeStep.next({ name: 'connections', num: 2 });
    this.router.navigate(['mughub/welcome/account-setup/connections']);
  }
}
