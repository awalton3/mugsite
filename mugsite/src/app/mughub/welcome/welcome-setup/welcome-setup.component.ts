import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { WelcomeService } from '../welcome.service';

@Component({
  selector: 'app-welcome-setup',
  templateUrl: './welcome-setup.component.html',
  styleUrls: ['./welcome-setup.component.css']
})
export class WelcomeSetupComponent implements OnInit {

  constructor(
    private router: Router,
    private welcomeService: WelcomeService
  ) { }

  ngOnInit() {
    this.welcomeService.onNav.subscribe(res => {
      switch (res.comp) {
        case 'profile':
          if (res.action === 'next')
            this.router.navigate(['/mughub/welcome']);
          break;
      }
    })
  }

  onProfile() {
    this.router.navigate(['/mughub/welcome/account-setup/profile'])
  }

}
