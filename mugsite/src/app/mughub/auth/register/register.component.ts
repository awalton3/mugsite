import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})

export class RegisterComponent implements OnInit {

  registerForm: FormGroup;

  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.initForm();
  }

  private initForm() {
    this.registerForm = new FormGroup ({
      'firstname': new FormControl (null, Validators.required),
      'lastname': new FormControl (null, Validators.required),
      'email': new FormControl (null, [Validators.required, Validators.email]),
      'password': new FormControl (null, [Validators.required, Validators.minLength(5)])
    });
  }

  onSubmit() {
    if(this.registerForm.valid) {
      let email = this.registerForm.value.email;
      let password = this.registerForm.value.password;
      this.authService.register(email, password)
        .subscribe(resData => {
          console.log(resData)
        }, error => {
          console.log(error)
        })
    }
    this.registerForm.reset();
  }
}
