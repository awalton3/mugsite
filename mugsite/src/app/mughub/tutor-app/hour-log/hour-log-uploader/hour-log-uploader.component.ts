import { Component, OnInit, Input, Output } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { FormGroup, FormControl, AbstractControl } from '@angular/forms';
import { User } from 'src/app/mughub/auth/user.model';
import { UserService } from 'src/app/mughub/auth/user.service';
import { startWith, map } from 'rxjs/operators';

@Component({
  selector: 'mughub-hour-log-uploader',
  templateUrl: './hour-log-uploader.component.html',
  styleUrls: ['./hour-log-uploader.component.css']
})
export class HourLogUploaderComponent implements OnInit {

  @Input() dateClicked: Date;
  @Output() onCloseUploder = new Subject;
  hourLogForm: FormGroup = new FormGroup({});
  connections: User[] = [];
  connectionNames: string[] = [];
  filteredOptions: Observable<User[]>;
  selectedConnection: User;
  currDate: Date;

  constructor(private userService: UserService) { }

  ngOnInit() {
    this.initForm();
    this.initAutoComp();
    this.connections = this.userService.getUserSession().connections;
    this.getConnectionNames();
    this.currDate = new Date();
  }

  initForm() {
    this.hourLogForm = new FormGroup({
      connection: new FormControl(null, this.ValidateConnection.bind(this)),
      date: new FormControl(this.dateClicked),
      startTime: new FormControl("00:00"),
      endTime: new FormControl("01:00"),
    })
  }

  ValidateConnection(control: AbstractControl) {
    return this.connectionNames.includes(control.value) ? null : { validConnection: false };
  }

  initAutoComp() {
    this.filteredOptions = this.hourLogForm.controls.connection.valueChanges
      .pipe(
        startWith(''),
        map(value => this.filterAutoComp(value))
      );
  }

  filterAutoComp(value: string) {
    if (this.connections && value) {
      const filterValue = value.toLowerCase();
      return this.connections.filter(connection => connection.name.toLowerCase().includes(filterValue));
    }
  }

  getConnectionNames() {
    this.connections.map(connection => this.connectionNames.push(connection.name));
  }

  onClose() {
    console.log(this.hourLogForm); 
    this.onCloseUploder.next();
  }

}
