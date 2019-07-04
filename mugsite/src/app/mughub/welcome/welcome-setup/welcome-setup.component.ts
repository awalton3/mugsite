import { Component, OnInit, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { WelcomeService } from '../welcome.service';

@Component({
  selector: 'mughub-welcome-setup',
  templateUrl: './welcome-setup.component.html',
  styleUrls: ['./welcome-setup.component.css']
})
export class WelcomeSetupComponent implements OnInit {

  currStep = { name: 'profile', num: 1 }; 
  showMobileStepper: boolean = false;
  screenWidth: any;

  @HostListener('window:resize', ['$event'])
  onResize() {
    this.adjustStepper();
  }

  constructor(
    private router: Router,
    private welcomeService: WelcomeService
  ) { }

  ngOnInit() {
    this.screenWidth = window.innerWidth;
    this.adjustStepper();
    this.welcomeService.onNav.subscribe(res => {
      switch (res.comp) {
        case 'profile':
          if (res.action === 'next')
            this.router.navigate(['/mughub/welcome']);
          break;
      }
    })
  }

  adjustStepper() {
    this.screenWidth = window.innerWidth;
    if (this.screenWidth < 430) {
      this.showMobileStepper = true;
    } else {
      this.showMobileStepper = false;
    }
  }
}
