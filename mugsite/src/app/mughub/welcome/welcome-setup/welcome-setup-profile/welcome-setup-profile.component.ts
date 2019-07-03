import { Component, OnInit, ViewChild } from '@angular/core';
import { WelcomeService } from '../../welcome.service';
import { Router } from '@angular/router';

@Component({
  selector: 'welcome-setup-profile',
  templateUrl: './welcome-setup-profile.component.html',
  styleUrls: ['./welcome-setup-profile.component.css']
})
export class WelcomeSetupProfileComponent implements OnInit {

  @ViewChild('profileImageEditor', {static: false}) profileImageEditor;
  chosenProfileImage: string;

  constructor(
    private welcomeService: WelcomeService,
    private router: Router
  ) { }

  ngOnInit() {
    this.chosenProfileImage = 'https://i.ibb.co/pjG5Rkf/4k-wallpaper-astronomy-evening-2085998.jpg';
  }

  onContinue() {
    this.welcomeService.onNav.next({ comp: 'profile', action: 'next' });
  }

  loadImages() {
    //allow drawer to open before loading the background images
    this.router.navigate(['mughub/welcome/account-setup/profile/image']);
  }

  onFinish() {
    this.chosenProfileImage = this.welcomeService.selectedProfileImage;
    this.profileImageEditor.close(); 
  }
}
