import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { UserService } from 'src/app/mughub/auth/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-welcome-setup-students',
  templateUrl: './welcome-setup-students.component.html',
  styleUrls: ['./welcome-setup-students.component.css']
})
export class WelcomeSetupStudentsComponent implements OnInit {

  studentForm: FormGroup;
   options: string[] = ['One', 'Two', 'Three'];

  constructor(private userService: UserService, private router: Router) { }

  ngOnInit() {
    this.studentForm = new FormGroup({
      'student': new FormControl(null)
    })
  }

  onFinish() {
    this.userService.updateLocalUser([{ name: 'isNewUser', value: false }]);
    this.userService.updateFbCollect();
    this.router.navigate(['mughub', this.userService.getCurrentUser().type]);
  }

}
