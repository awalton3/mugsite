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
      'name': new FormControl (null, Validators.required),
      'email': new FormControl (null, [Validators.required, Validators.email]),
      'password': new FormControl (null, [Validators.required, Validators.minLength(6)]),
      'type': new FormControl('student', Validators.required)
    });
  }

  onSubmit() {
    if(this.registerForm.valid && confirm('Are you sure you want to register as a ' + this.registerForm.value.type + '?')) {
      let email = this.registerForm.value.email;
      let password = this.registerForm.value.password;
      this.authService.register(email, password)
        .subscribe(resData => {
          console.log(resData)
        }, error => {
          console.log(error)
        })
    }
    this.initForm();
  }
  
}
