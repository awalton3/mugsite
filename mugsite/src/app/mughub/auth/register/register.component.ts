import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { UserService } from 'src/app/shared/services/user.service';
import { User } from 'src/app/shared/models/user.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})

export class RegisterComponent implements OnInit {

  registerForm: FormGroup;

  constructor(
    private authService: AuthService,
    private userService: UserService,
    private router: Router
  ) { }

  ngOnInit() {
    this.initForm();
  }

  private initForm() {
    this.registerForm = new FormGroup ({
      'name': new FormControl (null, Validators.required),
      'email': new FormControl (null, [Validators.required, Validators.email]),
      'password': new FormControl (null, [Validators.required, Validators.minLength(6)]),
      'type': new FormControl('student', Validators.required)
    });
  }

  onSubmit() {
    if(this.registerForm.valid && confirm('Are you sure you want to register as a ' + this.registerForm.value.type + '?')) {
      let data = this.registerForm.value;
      let user = new User(data.name, data.email, data.type);
      this.authService.register(data.email, data.password)
        .subscribe(resData => {
          console.log(resData);
          this.userService.addUser(user);
        }, errorMessage => {
          this.handleError(errorMessage)
        })
    }
    this.initForm();
  }

  handleError(errorMessage) {
    alert(errorMessage);
    if (errorMessage === 'The email address is already in use by another account. Try logging in.') {
      this.router.navigate(['/mughub/auth/login']);
    }
  }

}
