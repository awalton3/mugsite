import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'mughub-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent implements OnInit {

  hasLoaded: boolean;
  showAccountSetup: boolean;

  constructor(private router: Router) { }

  ngOnInit() {
    this.hasLoaded = false;
    this.showAccountSetup = false;
  }

  onGetStarted() {
    this.showAccountSetup = true;
    this.router.navigate(['mughub/welcome/account-setup'])
  }

  onExit() {
    this.router.navigate(['home'])
  }

  ngAfterViewInit() {
    this.hasLoaded = true;
  }

}
