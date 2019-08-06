import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UploadComponent } from './upload.component';
import { MaterialComponentsModule } from '../../angular-material/material-components.module';
import { TruncatePipeModule } from '../../pipes/truncate-pipe/truncate-pipe.module';
import { TwoDigitDatePipeModule } from '../../pipes/two-digit-date-pipe/two-digit-date-pipe.module';
import { MonthStringPipeModule } from '../../pipes/month-string-pipe/month-string-pipe.module';
import { AttachmentsModule } from '../../attachments/attachments.module';

@NgModule({
  declarations: [UploadComponent],
  imports: [
    CommonModule,
    MaterialComponentsModule,
    TruncatePipeModule,
    TwoDigitDatePipeModule,
    MonthStringPipeModule,
    AttachmentsModule
  ],
  exports: [
    UploadComponent
  ]
})
export class UploadModule {}
