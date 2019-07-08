import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialComponentsModule } from 'src/app/shared/angular-material/material-components.module';
import { UploadsComponent } from './uploads.component';
import { UploadsRoutingModule } from './uploads-routing.module';

@NgModule({
  declarations: [UploadsComponent],
  imports: [
    CommonModule,
    MaterialComponentsModule,
    UploadsRoutingModule
  ]
})

export class UploadsModule { }
