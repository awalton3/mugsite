import { Component, OnInit, Output, Inject } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { FormGroup, FormControl, AbstractControl, Validators } from '@angular/forms';
import { User } from 'src/app/mughub/auth/user.model';
import { UserService } from 'src/app/mughub/auth/user.service';
import { HourLogService } from '../../hour-log.service';
import { MatBottomSheet, MatBottomSheetRef, MAT_BOTTOM_SHEET_DATA } from '@angular/material/bottom-sheet';
import { startWith, map } from 'rxjs/operators';
import { HourLogAutomateBottomSheetComponent } from '../hour-log-automate-bottom-sheet/hour-log-automate-bottom-sheet.component';

@Component({
  selector: 'app-hour-log-uploader-bottomsheet',
  templateUrl: './hour-log-uploader-bottomsheet.component.html',
  styleUrls: ['./hour-log-uploader-bottomsheet.component.css']
})
export class HourLogUploaderBottomsheetComponent implements OnInit {

  hourLogForm: FormGroup = new FormGroup({});
  connections: User[] = [];
  connectionNames: string[] = [];
  filteredOptions: Observable<User[]>;
  selectedConnection: User;
  currDate: Date;

  constructor(
    private userService: UserService,
    private bottomSheet: MatBottomSheet,
    private hourLogService: HourLogService,
    private bottomSheetRef: MatBottomSheetRef<HourLogUploaderBottomsheetComponent>,
    @Inject(MAT_BOTTOM_SHEET_DATA) public data: { isEditMode: boolean, date: Date },
  ) { }

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
      date: new FormControl(this.data.date),
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
    this.bottomSheetRef.dismiss();
  }

  onSubmit() {
    let form = this.hourLogForm.value;
    if (!this.selectedConnection)
      this.selectedConnection = this.getConnectionUserObj(this.hourLogForm.value.connection);
    this.hourLogService.uploadHoursToFb(this.selectedConnection, form.date, form.startTime, form.endTime)
      .then(() => this.onClose())
      .catch(error => console.log(error))
  }

  getConnectionUserObj(connectionName: string) {
    let connectionUserObj = null;
    this.connections.map(connection => {
      if (connection.name === connectionName) {
        connectionUserObj = connection;
      }
    })
    return connectionUserObj;
  }

}
