import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { AuthService } from '../auth.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'mughub-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  redirectUrl: string = null;
  constructor(
    private authService: AuthService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    if (this.route.snapshot.queryParams && this.route.snapshot.queryParams.return) {
      this.redirectUrl = this.route.snapshot.queryParams.return;
    }
    this.initForm();
  }

  private initForm() {
    this.loginForm = new FormGroup({
      'email': new FormControl(null, [Validators.required, Validators.email]),
      'password': new FormControl(null, [Validators.required])
    });
  }

  onResetPassword() {
    if (!this.loginForm.value.email)
      alert("Please enter an email address and try again.");
    else
      this.authService.resetPassword(this.loginForm.value.email);
  }

  onSubmit() {
    this.authService.login(this.loginForm.value, this.redirectUrl);
  }

}
