import { Component, OnInit, ViewChild } from '@angular/core';
import { WelcomeService } from '../../welcome.service';
import { Router } from '@angular/router';
import { FormGroup, FormControl } from '@angular/forms';
import { UserService } from 'src/app/mughub/auth/user.service';

@Component({
  selector: 'welcome-setup-profile',
  templateUrl: './welcome-setup-profile.component.html',
  styleUrls: ['./welcome-setup-profile.component.css']
})
export class WelcomeSetupProfileComponent implements OnInit {

  @ViewChild('profileImageEditor', {static: false}) profileImageEditor;
  chosenProfileImage: string;
  nameForm: FormGroup;

  constructor(
    private welcomeService: WelcomeService,
    private userService: UserService,
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
    this.welcomeService.onNav.next({ comp: 'profile', action: 'next' });
  }

  loadImages() {
    //allow drawer to open before loading the background images
    this.router.navigate(['mughub/welcome/account-setup/profile/image']);
  }

  onFinish() {
    this.chosenProfileImage = this.welcomeService.newUserInfo.photoUrl;
    this.profileImageEditor.close();
  }
}
