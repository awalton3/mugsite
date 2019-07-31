import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UploaderComponent } from './uploader.component';
import { MaterialComponentsModule } from '../angular-material/material-components.module';
import { FormsMaterialComponentsModule } from '../angular-material/forms-material-components.module';
import { HeadnavModule } from 'src/app/mughub/headnav/headnav.module';
import { ConnectionFormModule } from '../connection-form/connection-form.module';

@NgModule({
  declarations: [UploaderComponent],
  imports: [
    CommonModule,
    MaterialComponentsModule,
    FormsMaterialComponentsModule,
    HeadnavModule,
    ConnectionFormModule
  ],
  exports: [
    UploaderComponent
  ]
})
export class UploaderModule { }
