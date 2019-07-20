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
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { CalendarService } from 'src/app/shared/calendar/calendar.service';
``
@NgModule({
  declarations: [HourLogComponent, CalendarComponent, HourLogUploaderComponent],
  imports: [
    CommonModule,
    MaterialComponentsModule,
    HourLogRoutingModule,
    HeadnavModule,
    ReactiveFormsModule,
    FormsMaterialComponentsModule,
    MatAutocompleteModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSidenavModule
  ],
  providers: [
    CalendarService
  ]
})
export class HourLogModule { }
