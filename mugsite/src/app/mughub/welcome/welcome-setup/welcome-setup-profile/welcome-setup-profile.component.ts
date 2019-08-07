import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/mughub/auth/user.service';
import { MatDrawer } from '@angular/material/sidenav';
import { StepperService } from 'src/app/shared/stepper/stepper.service';

@Component({
  selector: 'mughub-welcome-setup-profile',
  templateUrl: './welcome-setup-profile.component.html',
  styleUrls: ['./welcome-setup-profile.component.css']
})

export class WelcomeSetupProfileComponent implements OnInit {

  @ViewChild('profileImageEditor', { static: false }) profileImageEditor: MatDrawer;
  chosenProfileImage: string;
  submitted: boolean = false;

  constructor(
    private userService: UserService,
    private stepperService: StepperService,
    private router: Router
  ) { }

  ngOnInit() {
  }

  requestNameFormValue() {
    this.submitted = true; //triggers edit-user-profile comp to send value
  }

  onProfileSubmit(event: string) {
    const username = event;
    this.userService.updateLocalUser([{ name: 'name', value: username }]);
    this.stepperService.onChangeStep.next({ name: 'settings', num: 1 });
    this.router.navigate(["mughub/welcome/account-setup/settings"])
  }

  loadImages() {
    this.router.navigate(['mughub/welcome/account-setup/profile/image']);
  }

  onFinishProfileImage() {
    this.profileImageEditor.close();
  }
  
}
