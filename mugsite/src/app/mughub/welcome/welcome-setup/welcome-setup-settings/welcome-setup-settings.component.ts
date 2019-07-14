import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UserService } from 'src/app/mughub/auth/user.service';
import { User } from 'src/app/mughub/auth/user.model';
import { StepperService } from 'src/app/shared/stepper/stepper.service';
import { Router } from '@angular/router';

@Component({
  selector: 'mughub-welcome-setup-settings',
  templateUrl: './welcome-setup-settings.component.html',
  styleUrls: ['./welcome-setup-settings.component.css']
})
export class WelcomeSetupSettingsComponent implements OnInit {

  emailForm: FormGroup;
  user: User;

  constructor(
    private userService: UserService,
    private stepperService: StepperService,
    private router: Router
  ) { }

  ngOnInit() {
    this.emailForm = new FormGroup({
      email: new FormControl(null, Validators.email)
    })
    this.user = this.userService.getCurrentUser();
  }

  onSettingsSubmit() {
    this.stepperService.onChangeStep.next({ name: 'connections', num: 2 });
    this.router.navigate(['mughub/welcome/account-setup/connections']);
  }

  togglePref(pref: string) {
    let newPref = {};
    newPref[pref] = !this.user.prefs[pref];
    this.userService.updateLocalUser([{ name: 'prefs', value: newPref }])
  }
}
