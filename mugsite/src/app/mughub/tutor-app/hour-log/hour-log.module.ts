import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialComponentsModule } from 'src/app/shared/angular-material/material-components.module';
import { HourLogRoutingModule } from './hour-log-routing.module';
import { HourLogComponent } from './hour-log.component';
import { HeadnavModule } from '../../headnav/headnav.module';
``
@NgModule({
  declarations: [HourLogComponent],
  imports: [
    CommonModule,
    MaterialComponentsModule,
    HourLogRoutingModule,
    HeadnavModule
  ]
})
export class HourLogModule { }
