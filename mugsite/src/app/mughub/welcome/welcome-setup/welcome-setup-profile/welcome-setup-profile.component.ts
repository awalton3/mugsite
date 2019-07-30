import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl } from '@angular/forms';
import { UserService } from 'src/app/mughub/auth/user.service';
import { MatDrawer } from '@angular/material/sidenav';
import { StepperService } from 'src/app/shared/stepper/stepper.service';
import { User } from 'src/app/mughub/auth/user.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'mughub-welcome-setup-profile',
  templateUrl: './welcome-setup-profile.component.html',
  styleUrls: ['./welcome-setup-profile.component.css']
})
export class WelcomeSetupProfileComponent implements OnInit, OnDestroy {

  private subs = new Subscription();
  @ViewChild('profileImageEditor', { static: false }) profileImageEditor: MatDrawer;
  chosenProfileImage: string;
  nameForm: FormGroup;
  user: User;

  constructor(
    private userService: UserService,
    private stepperService: StepperService,
    private router: Router
  ) { }

  ngOnInit() {
    this.nameForm = new FormGroup({
      'username': new FormControl(this.userService.getUserSession().name)
    })
    this.user = this.userService.getUserSession(); 
    this.listenForUser();
  }

  listenForUser() {
    this.subs.add(this.userService.user.subscribe(user => {
      this.user = user;
    }))
  }

  onProfileSubmit() {
    this.userService.updateLocalUser([{ name: 'name', value: this.nameForm.value.username }]);
    this.stepperService.onChangeStep.next({ name: 'settings', num: 1 });
    this.router.navigate(["mughub/welcome/account-setup/settings"])
  }

  loadImages() {
    this.router.navigate(['mughub/welcome/account-setup/profile/image']);
  }

  onFinishProfileImage() {
    this.profileImageEditor.close();
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }
}
