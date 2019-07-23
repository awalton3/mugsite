import { Component, OnInit, Inject, ViewChild, ElementRef } from '@angular/core';
import { Observable } from 'rxjs';
import { FormGroup, FormControl, AbstractControl, Validators } from '@angular/forms';
import { User } from 'src/app/mughub/auth/user.model';
import { UserService } from 'src/app/mughub/auth/user.service';
import { HourLogService } from '../../hour-log.service';
import { MatBottomSheet, MatBottomSheetRef, MAT_BOTTOM_SHEET_DATA } from '@angular/material/bottom-sheet';
import { startWith, map } from 'rxjs/operators';
import { HourLogAutomateBottomSheetComponent } from '../hour-log-automate-bottom-sheet/hour-log-automate-bottom-sheet.component';
import { HourLogElement } from '../../hour-log-element.model';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MatChipInputEvent } from '@angular/material/chips';
import { MatAutocomplete, MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';

@Component({
  selector: 'app-hour-log-uploader-bottomsheet',
  templateUrl: './hour-log-uploader-bottomsheet.component.html',
  styleUrls: ['./hour-log-uploader-bottomsheet.component.css']
})

export class HourLogUploaderBottomsheetComponent implements OnInit {

  hourLogForm = new FormGroup({});
  currDate: Date;

  //autocomplete
  filteredConnections: Observable<User[]>;
  connections: User[] = [];
  connectionNames: string[] = [];
  @ViewChild('auto', { static: false }) matAutocomplete: MatAutocomplete;

  //chips
  selectable = true;
  removable = true;
  addOnBlur = true;
  separatorKeysCodes: number[] = [ENTER, COMMA];
  selectedConnection: string;
  selectedConnections: User[] = [];
  connectionInvalid: boolean = false;
  connectionExist: boolean = false;
  @ViewChild('connectionInput', { static: false }) connectionInput: ElementRef<HTMLInputElement>

  constructor(
    private userService: UserService,
    private bottomSheet: MatBottomSheet,
    private hourLogService: HourLogService,
    private bottomSheetRef: MatBottomSheetRef<HourLogUploaderBottomsheetComponent>,
    @Inject(MAT_BOTTOM_SHEET_DATA) public data: { isEditMode: boolean, hourLogEl: HourLogElement },
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
      connection: new FormControl(this.data.hourLogEl.connection.name, [this.ValidateConnection.bind(this)]),
      date: new FormControl(this.data.hourLogEl.date),
      startTime: new FormControl(this.data.hourLogEl.startTime, Validators.required),
      endTime: new FormControl(this.data.hourLogEl.endTime, [Validators.required, this.ValidateEndTime.bind(this)]),
    })
  }

  ValidateConnection(control: AbstractControl) {
    if (control.value && (!this.selectedConnections.includes(control.value) || this.connectionNames.includes(control.value)))
      return { validConnection: false };
    if (this.selectedConnections.length === 0 && control.value === null)
      return { validConnection: false };
    return null;
  }

  ValidateEndTime(control: AbstractControl) {
    if (this.hourLogForm.value.startTime)
      return control.value > this.hourLogForm.value.startTime ? null : { validEndTime: false };
    else
      return null;
  }

  initAutoComp() {
    this.filteredConnections = this.hourLogForm.controls.connection.valueChanges
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

  addConnectionChip(event: MatChipInputEvent) {
    if (!this.matAutocomplete.isOpen) {
      const input = event.input;
      const value = event.value;

      this.connectionExist = this.selectedConnections.some(connection => connection.name === value.trim());
      this.connectionInvalid = !this.connectionNames.includes(value.trim())

      if ((value || '').trim() && !this.connectionInvalid && !this.connectionExist)
        this.selectedConnections.push(this.getConnectionUserObj(value.trim()));

      if (input)
        input.value = '';
        
      this.hourLogForm.controls.connection.setValue(null);
    }
  }

  removeConnectionChip(connection: User) {
    const index = this.selectedConnections.indexOf(connection);
    if (index >= 0) {
      this.selectedConnections.splice(index, 1);
    }
  }

  connectionSelected(event: MatAutocompleteSelectedEvent) {
    this.connectionExist = this.selectedConnections.some(connection => connection.name === event.option.viewValue);
    if (!this.connectionExist) {
      this.selectedConnections.push(this.getConnectionUserObj(event.option.viewValue));
    }
    this.connectionInput.nativeElement.value = '';
    this.hourLogForm.controls.connection.setValue(null);
  }

  getConnectionNames() {
    this.connections.map(connection => this.connectionNames.push(connection.name));
  }

  onAutomate() {
    this.bottomSheet.open(HourLogAutomateBottomSheetComponent, {
      hasBackdrop: false
    });
  }

  onSubmit() {
    // if (!this.selectedConnection)
    //   this.selectedConnection = this.getConnectionUserObj(this.hourLogForm.value.connection);
    // this.data.isEditMode ? this.submitOnEdit() : this.submitOnAdd();
  }

  // submitOnAdd() {
  //   let form = this.hourLogForm.value;
  //   this.hourLogService.uploadHoursToFb(this.selectedConnection, form.date, form.startTime, form.endTime)
  //     .then(() => this.onSuccess())
  //     .catch(error => console.log(error))
  // }
  //
  // submitOnEdit() {
  //   if (this.ifFormChanged()) {
  //     let form = this.hourLogForm.value;
  //     this.hourLogService.updateHoursInFb(this.selectedConnection, form.date, form.startTime, form.endTime, this.data.hourLogEl.id)
  //       .then(() => this.onSuccess())
  //       .catch(error => console.log(error))
  //   } else this.onClose();
  // }

  onSuccess() {
    this.hourLogService.onLoggedHoursChanged();
    this.onClose();
  }

  onClose() {
    this.initForm();
    this.initAutoComp();
    this.bottomSheetRef.dismiss();
  }

  ifFormChanged() {
    for (let i = 0; i < Object.keys(this.hourLogForm.controls).length; i++) {
      const field = Object.keys(this.hourLogForm.controls)[i];
      if (!this.hourLogForm.controls[field].pristine)
        return true;
    }
    return false;
  }

  onDelete() {
    this.hourLogService.deleteHoursInFb(this.data.hourLogEl.id)
      .then(() => this.onSuccess())
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
