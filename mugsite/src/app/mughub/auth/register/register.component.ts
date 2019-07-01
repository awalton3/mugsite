import { Component, OnInit, OnDestroy } from '@angular/core';
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
      this.authService.register(this.registerForm.value);
    }

}
