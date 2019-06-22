import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from './auth/auth.service';
import { UserService } from '../shared/services/user.service';
import { Router } from '@angular/router';

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
  ) {}

  ngOnInit() {
    this.authService.autoLogin();
    this.userService.user.subscribe(user => {
      if (user)
        this.router.navigate(['mughub', user.type])
    })
  }

  ngOnDestroy() {
    this.userService.user.unsubscribe()
  }

}
