import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-welcome-init',
  templateUrl: './welcome-init.component.html',
  styleUrls: ['./welcome-init.component.css']
})
export class WelcomeInitComponent implements OnInit, AfterViewInit {

  hasLoaded = false;

  constructor(private router: Router) { }

  ngOnInit() {
  }

  onGetStarted() {
    this.router.navigate(['/mughub/welcome/account-setup'])
  }

  ngAfterViewInit() {
    this.hasLoaded = true; 
  }


}
