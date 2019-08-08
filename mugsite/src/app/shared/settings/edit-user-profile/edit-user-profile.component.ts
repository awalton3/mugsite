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

  @Input() valueRequested: boolean = false;
  @Input() currProfileImageUrl: string;
  @Input() styleBreak?: boolean = false;
  @Output() onOpenImageUploader = new Subject();
  @Output() onValueRequest = new Subject<string>();
  nameForm: FormGroup = new FormGroup({});
  user: User;

  constructor(private userService: UserService) { }

  ngOnInit() {
    this.nameForm = new FormGroup({
      'username': new FormControl(this.userService.getUserSession().name)
    })
  }

  ngOnChanges(changes: SimpleChanges) {
    if(changes && changes.valueRequested && changes.valueRequested.currentValue)
      this.onValueRequest.next(this.nameForm.value.username);
  }
}
