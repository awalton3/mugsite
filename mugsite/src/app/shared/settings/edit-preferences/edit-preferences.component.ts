import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/mughub/auth/user.model';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { UserService } from 'src/app/mughub/auth/user.service';

@Component({
  selector: 'mughub-edit-preferences',
  templateUrl: './edit-preferences.component.html',
  styleUrls: ['./edit-preferences.component.css']
})
export class EditPreferencesComponent implements OnInit {

  private subs = new Subscription();
  emailForm: FormGroup;
  user: User;

  constructor(private userService: UserService) { }

  ngOnInit() {
    this.emailForm = new FormGroup({
      email: new FormControl(null, Validators.email)
    });
    this.user = this.userService.getUserSession();
    this.listenForUser();
  }

  listenForUser() {
    this.subs.add(this.userService.user.subscribe(user => {
      this.user = user;
    }))
  }

  togglePref(pref: string) {
    let newPref = {};
    newPref[pref] = !this.user.prefs[pref];
    this.userService.updateLocalUser([{ name: 'prefs', value: newPref }])
    this.userService.updateFbCollect(); 
  }

}
