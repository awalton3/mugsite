import { Component, OnInit, OnDestroy, OnChanges } from '@angular/core';
import { Subscription } from 'rxjs';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-tutor-app',
  templateUrl: './tutor-app.component.html',
  styleUrls: ['./tutor-app.component.css']
})
export class TutorAppComponent implements OnInit, OnDestroy, OnChanges {

  authCheckInterval: any;
  //authSub: Subscription;
  //isAuth: boolean;

  constructor(private userService: UserService) { }

  ngOnInit() {
    this.authCheckInterval = setInterval(this.userService.ifTimedOut, 1000)
    // this.authSub = this.userService.isAuthenticated.subscribe(isUserAuth => {
    //   this.isAuth = isUserAuth;
    // })
  }

  ngOnChanges(changes) {
    //console.log(changes.isAuth)
  }

  ngOnDestroy() {
    clearInterval(this.authCheckInterval);
  }

}
