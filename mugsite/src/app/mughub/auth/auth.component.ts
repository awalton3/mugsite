import { Component, OnInit } from '@angular/core';
import { AuthService } from './auth.service';
import { UserService } from 'src/app/shared/services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {

  constructor(
    private authService: AuthService,
    private userService: UserService,
    private router: Router
  ) { }

  ngOnInit() {
    console.log('auth was launched')
    // this.authService.autoLogin();
    // this.userService.user.subscribe(user => {
    //   if (user)
    //     this.router.navigate(['mughub', user.type])
    // })
  }

}
