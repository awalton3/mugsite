import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialComponentsModule } from 'src/app/shared/angular-material/material-components.module';
import { HourLogRoutingModule } from './hour-log-routing.module';
import { HourLogComponent } from './hour-log.component';
import { HeadnavModule } from '../../headnav/headnav.module';
import { CalendarComponent } from 'src/app/shared/calendar/calendar.component';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsMaterialComponentsModule } from 'src/app/shared/angular-material/forms-material-components.module';
import { MatSidenavModule } from '@angular/material/sidenav';
import { HourLogUploaderComponent } from './hour-log-uploader/hour-log-uploader.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { CalendarService } from 'src/app/shared/calendar/calendar.service';
import { HourLogAutomateBottomSheetComponent } from './hour-log-uploader/hour-log-automate-bottom-sheet/hour-log-automate-bottom-sheet.component';
import { MatBottomSheetModule } from '@angular/material/bottom-sheet';
import { HourLogUploaderBottomsheetComponent } from './hour-log-uploader/hour-log-uploader-bottomsheet/hour-log-uploader-bottomsheet.component';
import { StandardTimePipe } from './standard-time.pipe';
import { ConnectionFormModule } from 'src/app/shared/connection-form/connection-form.module';
import { SnackBarModule } from 'src/app/shared/snack-bar/snack-bar.module';


@NgModule({
  declarations: [
    HourLogComponent,
    CalendarComponent,
    HourLogUploaderComponent,
    HourLogAutomateBottomSheetComponent,
    HourLogUploaderBottomsheetComponent,
    StandardTimePipe
  ],
  imports: [
    CommonModule,
    MaterialComponentsModule,
    HourLogRoutingModule,
    HeadnavModule,
    ReactiveFormsModule,
    FormsMaterialComponentsModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSidenavModule,
    MatBottomSheetModule,
    ConnectionFormModule,
    SnackBarModule
  ],
  providers: [
    CalendarService
  ],
  entryComponents: [HourLogAutomateBottomSheetComponent, HourLogUploaderBottomsheetComponent],
})
export class HourLogModule { }
