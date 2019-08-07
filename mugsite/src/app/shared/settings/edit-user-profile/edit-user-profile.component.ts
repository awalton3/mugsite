import { Component, OnInit, Output, Input, OnChanges, SimpleChanges } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { UserService } from 'src/app/mughub/auth/user.service';
import { Subject } from 'rxjs';
import { User } from 'src/app/mughub/auth/user.model';

@Component({
  selector: 'mughub-edit-user-profile',
  templateUrl: './edit-user-profile.component.html',
  styleUrls: ['./edit-user-profile.component.css']
})
export class EditUserProfileComponent implements OnInit, OnChanges {

  // private subs = new Subscription();
  @Input() valueRequested: boolean = false;
  @Input() currProfileImageUrl: string;
  @Output() onOpenImageUploader = new Subject();
  @Output() onValueRequest = new Subject<string>();
  nameForm: FormGroup = new FormGroup({});
  user: User;

  constructor(private userService: UserService) { }

  ngOnInit() {
    this.nameForm = new FormGroup({
      'username': new FormControl(this.userService.getUserSession().name)
    })
    // this.user = this.userService.getUserSession();
    // this.listenForUser();
  }

  ngOnChanges(changes: SimpleChanges) {
    if(changes && changes.valueRequested && changes.valueRequested.currentValue)
      this.onValueRequest.next(this.nameForm.value.username);
  }

  // listenForUser() {
  //   this.subs.add(this.userService.user.subscribe(user => {
  //     this.user = user;
  //   }))
  // }
  //
  // ngOnDestroy() {
  //   this.subs.unsubscribe();
  // }
}
