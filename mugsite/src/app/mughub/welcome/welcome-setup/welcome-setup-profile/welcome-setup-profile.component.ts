import { Component, OnInit, ViewChild } from '@angular/core';
import { WelcomeService } from '../../welcome.service';
import { Router } from '@angular/router';
import { FormGroup, FormControl } from '@angular/forms';
import { UserService } from 'src/app/mughub/auth/user.service';
import { MatDrawer } from '@angular/material/sidenav';
import { StepperService } from 'src/app/shared/stepper/stepper.service';

@Component({
  selector: 'welcome-setup-profile',
  templateUrl: './welcome-setup-profile.component.html',
  styleUrls: ['./welcome-setup-profile.component.css']
})
export class WelcomeSetupProfileComponent implements OnInit {

  @ViewChild('profileImageEditor', {static: false}) profileImageEditor: MatDrawer;
  chosenProfileImage: string;
  nameForm: FormGroup;

  constructor(
    private welcomeService: WelcomeService,
    private userService: UserService,
    private stepperService: StepperService,
    private router: Router
  ) { }

  ngOnInit() {
    this.chosenProfileImage = 'https://i.ibb.co/pjG5Rkf/4k-wallpaper-astronomy-evening-2085998.jpg';
    this.nameForm = new FormGroup({
      'username': new FormControl(this.userService.getUserSession().name)
    })
  }

  onProfileSubmit() {
    this.welcomeService.newUserInfo.name = this.nameForm.value.username;
    this.stepperService.onChangeStep.next({ name: 'settings', num: 1 });
    this.router.navigate(["mughub/welcome/account-setup/settings"])
  }

  loadImages() {
    this.router.navigate(['mughub/welcome/account-setup/profile/image']);
  }

  onFinishProfileImage() {
    this.chosenProfileImage = this.welcomeService.newUserInfo.photoUrl;
    this.profileImageEditor.close();
  }
}
