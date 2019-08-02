import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UploaderComponent } from './uploader.component';
import { HeadnavModule } from 'src/app/mughub/headnav/headnav.module';
import { MaterialComponentsModule } from '../../angular-material/material-components.module';
import { FormsMaterialComponentsModule } from '../../angular-material/forms-material-components.module';
import { ConnectionFormModule } from '../../connection-form/connection-form.module';
import { MatChipsModule } from '@angular/material/chips';
import { TruncatePipe } from '../../pipes/truncate.pipe';
import { MatTooltipModule } from '@angular/material/tooltip';


@NgModule({
  declarations: [UploaderComponent, TruncatePipe],
  imports: [
    CommonModule,
    MaterialComponentsModule,
    FormsMaterialComponentsModule,
    HeadnavModule,
    ConnectionFormModule,
    MatChipsModule,
    MatTooltipModule
  ],
  exports: [
    UploaderComponent
  ]
})
export class UploaderModule { }
