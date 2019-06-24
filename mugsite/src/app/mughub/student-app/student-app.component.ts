import { Component, OnInit, OnDestroy, OnChanges } from '@angular/core';
import { UserService } from 'src/app/shared/services/user.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-student-app',
  templateUrl: './student-app.component.html',
  styleUrls: ['./student-app.component.css']
})
export class StudentAppComponent implements OnInit, OnDestroy, OnChanges {

  // authCheck: any;
  // isAuthSub: Subscription;
  // isAuthenticated: boolean;

  constructor(private userService: UserService) { }

  ngOnInit() {
    // //check authentication status every miniute
    // this.authCheck = setInterval(this.userService.isUserAuthenticated, 60 * 1000);
    // //subscribe to changes in user auth status
    // this.userService.isAuthenticated.subscribe(isUserAuth => {
    //   this.isAuthenticated = isUserAuth;
    // })
  }

  ngOnChanges(changes) {

  }

  ngOnDestroy() {
    //clearInterval(this.authCheck);
  }

}
