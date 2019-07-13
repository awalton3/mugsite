import { Router } from '@angular/router';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from './auth/auth.service';
import { UserService } from './auth/user.service';

@Component({
  selector: 'app-mughub',
  templateUrl: './mughub.component.html',
  styleUrls: ['./mughub.component.css']
})

export class MughubComponent implements OnInit, OnDestroy {

  constructor(
    private authService: AuthService,
    private userService: UserService,
    private router: Router
  ) { }

  ngOnInit() {
    this.authService.autoLogin();
  }

  ngOnDestroy() {
    this.userService.user.unsubscribe();
  }

}
