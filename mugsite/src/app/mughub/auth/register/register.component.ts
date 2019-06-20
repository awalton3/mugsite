import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { UserService } from 'src/app/shared/services/user.service';
import { User } from 'src/app/shared/models/user.model';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})

export class RegisterComponent implements OnInit {

  registerForm: FormGroup;

  constructor(
    private authService: AuthService,
    private userService: UserService
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
        }, error => {
          console.log(error);
        })
    }
    this.initForm();
  }

}
