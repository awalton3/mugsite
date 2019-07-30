import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, AbstractControl, Validators } from '@angular/forms';
import { User } from 'src/app/mughub/auth/user.model';
import { HourLogService } from '../../hour-log.service';
import { MatBottomSheet, MatBottomSheetRef, MAT_BOTTOM_SHEET_DATA } from '@angular/material/bottom-sheet';
import { HourLogAutomateBottomSheetComponent } from '../hour-log-automate-bottom-sheet/hour-log-automate-bottom-sheet.component';
import { HourLogElement } from '../../hour-log-element.model';
import { SnackBarService } from 'src/app/shared/snack-bar/snack-bar.service';
import { ConnectionFormService } from 'src/app/shared/connection-form/connection-form.service';
import { Subscription } from 'rxjs';
import { UserService } from 'src/app/mughub/auth/user.service';

@Component({
  selector: 'app-hour-log-uploader-bottomsheet',
  templateUrl: './hour-log-uploader-bottomsheet.component.html',
  styleUrls: ['./hour-log-uploader-bottomsheet.component.css']
})

export class HourLogUploaderBottomsheetComponent implements OnInit, OnDestroy {

  private subs = new Subscription();
  hourLogForm = new FormGroup({});
  connectionsValid: boolean = false;
  selectedConnections: User[] = [];
  selectedConnectionsOrig: User[] = [];
  possibleConnections: User[] = [];

  constructor(
    private userService: UserService,
    private bottomSheet: MatBottomSheet,
    private hourLogService: HourLogService,
    private connectionsFormService: ConnectionFormService,
    private snackBarService: SnackBarService,
    private bottomSheetRef: MatBottomSheetRef<HourLogUploaderBottomsheetComponent>,
    @Inject(MAT_BOTTOM_SHEET_DATA) public data: { isEditMode: boolean, hourLogEl: HourLogElement },
  ) { }

  ngOnInit() {
    this.possibleConnections = this.userService.getUserSession().connections;
    this.initForm();
    this.listenToSelectedConnections();
    this.listenToConnectionsValid();
  }

  listenToSelectedConnections() {
    this.subs.add(this.connectionsFormService.onConnectionsChanged.subscribe(connectionsObj => {
      this.selectedConnections = connectionsObj.selectedConnections;
      this.selectedConnectionsOrig = connectionsObj.selectedConnectionsOrig;
    }));
  }

  listenToConnectionsValid() {
    this.subs.add(this.connectionsFormService.isformValid.subscribe(isFormValid => {
      this.connectionsValid = isFormValid;
    }));
  }

  initForm() {
    this.hourLogForm = new FormGroup({
      date: new FormControl(this.data.hourLogEl.date),
      startTime: new FormControl(this.data.hourLogEl.startTime, Validators.required),
      endTime: new FormControl(this.data.hourLogEl.endTime, [Validators.required, this.ValidateEndTime.bind(this)]),
      test: new FormControl(null)
    })
  }

  ValidateEndTime(control: AbstractControl) {
    if (this.hourLogForm.value.startTime)
      return control.value > this.hourLogForm.value.startTime ? null : { validEndTime: false };
    else
      return null;
  }

  onAutomate() {
    this.bottomSheet.open(HourLogAutomateBottomSheetComponent, {
      hasBackdrop: false
    });
  }

  onSubmit() {
    let form = this.hourLogForm.value;
    this.data.isEditMode ? this.submitOnEdit(form) : this.submitOnAdd(form);
  }

  submitOnAdd(form: { startTime: string; endTime: string; date: Date; }) {
    const timeConflict = this.hourLogService.isHourLogConflict(form.startTime, form.endTime, form.date, null);
    if (!timeConflict) {
      this.hourLogService.uploadHoursToFb(this.selectedConnections, form.date, form.startTime, form.endTime)
        .then(() => this.onSuccess())
        .catch(error => this.onError(error))
    } else {
      this.snackBarService.onOpenSnackBar.next({ message: 'Time Conflict', isError: true });
    }
  }

  submitOnEdit(form: { startTime: string; endTime: string; date: Date; }) {
    const formChanged = this.ifFormChanged();
    const timeConflict = this.hourLogService.isHourLogConflict(form.startTime, form.endTime, form.date, this.data.hourLogEl.id);
    if (!formChanged) this.onClose();
    else if (formChanged && !timeConflict) {
      this.hourLogService.updateHoursInFb(this.selectedConnections, form.date, form.startTime, form.endTime, this.data.hourLogEl.id)
        .then(() => this.onSuccess())
        .catch(error => this.onError(error))
    } else {
      this.snackBarService.onOpenSnackBar.next({ message: 'Time Conflict', isError: true });
    }
  }

  onDelete() {
    this.hourLogService.deleteHoursInFb(this.data.hourLogEl.id)
      .then(() => this.onSuccess())
      .catch(error => this.onError(error))
  }

  ifFormChanged() {
    if (JSON.stringify(this.selectedConnections) !== JSON.stringify(this.selectedConnectionsOrig))
      return true;
    for (let i = 0; i < Object.keys(this.hourLogForm.controls).length; i++) {
      const field = Object.keys(this.hourLogForm.controls)[i];
      if (!this.hourLogForm.controls[field].pristine) return true;
    }
    return false;
  }

  onSuccess() {
    this.snackBarService.onOpenSnackBar.next({ message: 'Successfully Updated Hour Log', isError: false });
    this.hourLogService.onLoggedHoursChanged();
    this.onClose();
  }

  onError(error: any) {
    console.log(error);
    this.snackBarService.onOpenSnackBar.next({ message: 'Error Occurred', isError: true });
  }

  onClose() {
    this.initForm();
    this.bottomSheetRef.dismiss();
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }

}
