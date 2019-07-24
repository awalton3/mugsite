import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormControl, AbstractControl, Validators } from '@angular/forms';
import { User } from 'src/app/mughub/auth/user.model';
import { HourLogService } from '../../hour-log.service';
import { MatBottomSheet, MatBottomSheetRef, MAT_BOTTOM_SHEET_DATA } from '@angular/material/bottom-sheet';
import { HourLogAutomateBottomSheetComponent } from '../hour-log-automate-bottom-sheet/hour-log-automate-bottom-sheet.component';
import { HourLogElement } from '../../hour-log-element.model';

@Component({
  selector: 'app-hour-log-uploader-bottomsheet',
  templateUrl: './hour-log-uploader-bottomsheet.component.html',
  styleUrls: ['./hour-log-uploader-bottomsheet.component.css']
})

export class HourLogUploaderBottomsheetComponent implements OnInit {

  hourLogForm = new FormGroup({});
  connectionsValid: boolean = false;
  connectionsFormChanged: boolean = false;
  selectedConnections: User[] = [];

  constructor(
    private bottomSheet: MatBottomSheet,
    private hourLogService: HourLogService,
    private bottomSheetRef: MatBottomSheetRef<HourLogUploaderBottomsheetComponent>,
    @Inject(MAT_BOTTOM_SHEET_DATA) public data: { isEditMode: boolean, hourLogEl: HourLogElement },
  ) { }

  ngOnInit() {
    this.initForm();
  }

  checkConnectionsForm(event: { valid: boolean, value: User[], changed: boolean }) {
    this.connectionsValid = event.valid;
    this.selectedConnections = event.value;
    this.connectionsFormChanged = event.changed;
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
    if (!this.hourLogService.isHourLogConflict(form.startTime, form.endTime, form.date))
      this.data.isEditMode ? this.submitOnEdit() : this.submitOnAdd();
    else
      console.log('conflict')
  }

  submitOnAdd() {
    let form = this.hourLogForm.value;
    this.hourLogService.uploadHoursToFb(this.selectedConnections, form.date, form.startTime, form.endTime)
      .then(() => this.onSuccess())
      .catch(error => console.log(error))
  }

  submitOnEdit() {
    if (this.ifFormChanged() || this.connectionsFormChanged) {
      let form = this.hourLogForm.value;
      this.hourLogService.updateHoursInFb(this.selectedConnections, form.date, form.startTime, form.endTime, this.data.hourLogEl.id)
        .then(() => this.onSuccess())
        .catch(error => console.log(error))
    } else this.onClose();
  }

  onDelete() {
    this.hourLogService.deleteHoursInFb(this.data.hourLogEl.id)
      .then(() => this.onSuccess())
      .catch(error => console.log(error))
  }

  ifFormChanged() {
    for (let i = 0; i < Object.keys(this.hourLogForm.controls).length; i++) {
      const field = Object.keys(this.hourLogForm.controls)[i];
      if (!this.hourLogForm.controls[field].pristine)
        return true;
    }
    return false;
  }

  onSuccess() {
    this.hourLogService.onLoggedHoursChanged();
    this.onClose();
  }

  onClose() {
    this.initForm();
    this.bottomSheetRef.dismiss();
  }

}
