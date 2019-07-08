import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl } from '@angular/forms';
import { UserService } from 'src/app/mughub/auth/user.service';
import { MatDrawer } from '@angular/material/sidenav';
import { StepperService } from 'src/app/shared/stepper/stepper.service';
import { User } from 'src/app/mughub/auth/user.model';

@Component({
  selector: 'welcome-setup-profile',
  templateUrl: './welcome-setup-profile.component.html',
  styleUrls: ['./welcome-setup-profile.component.css']
})
export class WelcomeSetupProfileComponent implements OnInit {

  @ViewChild('profileImageEditor', {static: false}) profileImageEditor: MatDrawer;
  chosenProfileImage: string;
  nameForm: FormGroup;
  user: User;

  constructor(
    private userService: UserService,
    private stepperService: StepperService,
    private router: Router
  ) { }

  ngOnInit() {
    this.user = this.userService.getCurrentUser();
    this.chosenProfileImage = this.user.photoUrl;
    this.nameForm = new FormGroup({
      'username': new FormControl(this.user.name)
    })
  }

  onProfileSubmit() {
    this.userService.updateLocalUser([{propName: 'name', value: this.nameForm.value.username.toLowerCase()}]);
    this.stepperService.onChangeStep.next({ name: 'settings', num: 1 });
    this.router.navigate(["mughub/welcome/account-setup/settings"])
  }

  loadImages() {
    this.router.navigate(['mughub/welcome/account-setup/profile/image']);
  }

  onFinishProfileImage() {
    this.chosenProfileImage = this.user.photoUrl;
    this.profileImageEditor.close();
  }
}
