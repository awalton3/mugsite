import { Component, OnInit, Output, OnDestroy } from '@angular/core';
import { Subject, Observable, Subscription } from 'rxjs';
import { FormGroup, FormControl, AbstractControl, Validators } from '@angular/forms';
import { User } from 'src/app/mughub/auth/user.model';
import { UserService } from 'src/app/mughub/auth/user.service';
import { startWith, map } from 'rxjs/operators';
import { CalendarService } from 'src/app/shared/calendar/calendar.service';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { HourLogAutomateBottomSheetComponent } from './hour-log-automate-bottom-sheet/hour-log-automate-bottom-sheet.component';

@Component({
  selector: 'mughub-hour-log-uploader',
  templateUrl: './hour-log-uploader.component.html',
  styleUrls: ['./hour-log-uploader.component.css']
})

export class HourLogUploaderComponent implements OnInit, OnDestroy {

  private subs = new Subscription();
  @Output() onCloseUploder = new Subject;
  hourLogForm: FormGroup = new FormGroup({});
  connections: User[] = [];
  connectionNames: string[] = [];
  filteredOptions: Observable<User[]>;
  selectedConnection: User;
  currDate: Date;

  constructor(
    private userService: UserService,
    private calendarService: CalendarService,
    private bottomSheet: MatBottomSheet
  ) { }

  ngOnInit() {
    this.initForm();
    this.initAutoComp();
    this.connections = this.userService.getUserSession().connections;
    this.getConnectionNames();
    this.currDate = new Date();
    this.subs.add(this.calendarService.onDateClick.subscribe(date => {
      this.hourLogForm.controls.date.setValue(date);
    }));
  }

  initForm() {
    this.hourLogForm = new FormGroup({
      connection: new FormControl(null, this.ValidateConnection.bind(this)),
      date: new FormControl(null),
      startTime: new FormControl("15:00", Validators.required),
      endTime: new FormControl("16:00", [Validators.required, this.ValidateEndTime.bind(this)]),
    })
  }

  ValidateConnection(control: AbstractControl) {
    return this.connectionNames.includes(control.value) ? null : { validConnection: false };
  }

  ValidateEndTime(control: AbstractControl) {
    if (this.hourLogForm.value.startTime)
      return control.value > this.hourLogForm.value.startTime ? null : { validEndTime: false };
    else
      return null;
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

  onAutomate() {
    this.bottomSheet.open(HourLogAutomateBottomSheetComponent, {
      hasBackdrop: false
    });
  }

  onClose() {
    this.initForm();
    this.initAutoComp();
    this.onCloseUploder.next();
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }

}
