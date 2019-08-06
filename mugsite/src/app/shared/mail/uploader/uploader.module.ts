import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UploaderComponent } from './uploader.component';
import { HeadnavModule } from 'src/app/mughub/headnav/headnav.module';
import { MaterialComponentsModule } from '../../angular-material/material-components.module';
import { FormsMaterialComponentsModule } from '../../angular-material/forms-material-components.module';
import { ConnectionFormModule } from '../../connection-form/connection-form.module';
import { MatChipsModule } from '@angular/material/chips';
import { MatTooltipModule } from '@angular/material/tooltip';
import { TruncatePipeModule } from '../../pipes/truncate-pipe/truncate-pipe.module';
import { AttachmentsModule } from '../../attachments/attachments.module';


@NgModule({
  declarations: [UploaderComponent],
  imports: [
    CommonModule,
    MaterialComponentsModule,
    FormsMaterialComponentsModule,
    HeadnavModule,
    ConnectionFormModule,
    MatChipsModule,
    MatTooltipModule,
    TruncatePipeModule,
    AttachmentsModule
  ],
  exports: [
    UploaderComponent
  ]
})
export class UploaderModule { }
