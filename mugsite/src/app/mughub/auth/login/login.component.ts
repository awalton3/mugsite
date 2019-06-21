import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { AuthService } from '../auth.service';
import { UserService } from 'src/app/shared/services/user.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit, OnDestroy {

  loginForm: FormGroup;
  userSub: Subscription;

  constructor(
    private authService: AuthService,
    private userService: UserService,
    private router: Router
  ) { }

  ngOnInit() {
    this.initForm();
  }

  private initForm() {
    this.loginForm = new FormGroup({
      'email': new FormControl(null, [Validators.required, Validators.email]),
      'password': new FormControl(null, [Validators.required])
    });
  }

  onResetPassword() {
    if(!this.loginForm.value.email)
      alert("Please enter an email address and try again.")
    else
      this.authService.resetPassword(this.loginForm.value.email);
  }

  onSubmit() {
    this.authService.login(this.loginForm.value)
    this.userSub = this.userService.user.subscribe(user => {
      if (user && user.type === 'student')
        this.router.navigate(['mughub/student-app'])
      if (user && user.type === 'tutor')
        this.router.navigate(['mughub/tutor-app'])
    })
  }

  ngOnDestroy() {
    if (this.userSub)
      this.userSub.unsubscribe();
    if (this.userService.userFbCollectSub)
      this.userService.userFbCollectSub.unsubscribe();
  }

}
