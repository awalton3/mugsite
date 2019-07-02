import { Component, OnInit, ViewChild } from '@angular/core';
import { WelcomeService } from '../../welcome.service';
import { Router } from '@angular/router';

@Component({
  selector: 'welcome-setup-profile',
  templateUrl: './welcome-setup-profile.component.html',
  styleUrls: ['./welcome-setup-profile.component.css']
})
export class WelcomeSetupProfileComponent implements OnInit {
  constructor(
    private welcomeService: WelcomeService,
    private router: Router
  ) { }

  ngOnInit() {
  }

  onContinue() {
    this.welcomeService.onNav.next({ comp: 'profile', action: 'next' });
  }

  loadImages() {
    //allow drawer to open all the way before loading the background images
    this.router.navigate(['mughub/welcome/account-setup/profile/image']);
  }
}
