import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-welcome-init',
  templateUrl: './welcome-init.component.html',
  styleUrls: ['./welcome-init.component.css']
})
export class WelcomeInitComponent implements OnInit {

  constructor(
    private router: Router
  ) { }

  ngOnInit() {
  }

  onGetStarted() {
    this.router.navigate(['/mughub/welcome/account-setup'])
  }


}
