import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {

  loginForm: FormGroup;

  constructor(
    private authService: AuthService) { }

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
    if (!this.loginForm.value.email)
      alert("Please enter an email address and try again.")
    else
      this.authService.resetPassword(this.loginForm.value.email);
  }

  onSubmit() {
    this.authService.login(this.loginForm.value)
  }

}
