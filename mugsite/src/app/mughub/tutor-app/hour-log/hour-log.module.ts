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
    MatSidenavModule
  ]
})
export class HourLogModule { }
