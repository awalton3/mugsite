import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {

  loginForm: FormGroup;

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
    this.initForm();
  }

  private initForm() {
    this.loginForm = new FormGroup ({
      'email': new FormControl (null, [Validators.required, Validators.email]),
      'password': new FormControl (null, [Validators.required])
    });
  }

  onSubmit() {
    this.authService.login(this.loginForm.value.email, this.loginForm.value.password)
      .subscribe(resData => {
        this.loginForm.reset();
      }, errorMessage => {
        this.handleError(errorMessage);
      });
  }

  handleError(errorMessage) {
    alert(errorMessage);
    if (errorMessage === 'Email not found. Please create an account.') {
      this.router.navigate(['/mughub/auth/register']);
    } else if (errorMessage === 'Incorrect password') {
      this.loginForm.setValue({'email': this.loginForm.value.email, 'password': ''});
    } else {
      this.loginForm.reset();
    }
  }
}
