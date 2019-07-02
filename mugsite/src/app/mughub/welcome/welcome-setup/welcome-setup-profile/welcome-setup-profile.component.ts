import { Component, OnInit } from '@angular/core';
import { WelcomeService } from '../../welcome.service';

@Component({
  selector: 'welcome-setup-profile',
  templateUrl: './welcome-setup-profile.component.html',
  styleUrls: ['./welcome-setup-profile.component.css']
})
export class WelcomeSetupProfileComponent implements OnInit {

  constructor(private welcomeService: WelcomeService) { }

  ngOnInit() {
  }

  onContinue() {
    this.welcomeService.onNav.next({comp: 'profile', action: 'next'});
  }

}
